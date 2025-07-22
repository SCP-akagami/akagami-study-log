import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import type { Node } from 'unist'

// 画像URLの有効性を確認する関数
export async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    const contentType = response.headers.get('content-type')
    return response.ok && (contentType?.startsWith('image/') ?? false)
  } catch {
    return false
  }
}

// 記事の最初の画像を抽出する関数
export function extractFirstImage(content: string): string | null {
  // Markdownの画像記法 ![alt](src) を正規表現で抽出
  const imageRegex = /!\[.*?\]\(([^)]+)\)/
  const match = content.match(imageRegex)
  
  if (match && match[1]) {
    const src = match[1].trim()
    
    // 相対パスの場合は絶対パスに変換
    if (!src.startsWith('http') && !src.startsWith('/')) {
      return `/images/${src}`
    } else {
      return src
    }
  }
  
  return null
}

// 画像パスを処理するプラグイン
function rehypeImagePath() {
  return (tree: Node) => {
    visit(tree, 'element', (node: Node & { tagName?: string; properties?: { src?: string; className?: string[] } }) => {
      if (node.tagName === 'img') {
        const src = node.properties?.src
        if (src && typeof src === 'string') {
          // 相対パスの場合のみ/images/に変換（絶対パスやHTTPSは変換しない）
          if (!src.startsWith('http') && !src.startsWith('/') && !src.startsWith('data:')) {
            if (node.properties) {
              node.properties.src = `/images/${src}`
            }
          }
          // 画像にレスポンシブ対応のCSSクラスを追加
          if (node.properties) {
            node.properties.className = [
              ...(node.properties.className || []),
              'max-w-full',
              'h-auto',
              'rounded-lg',
              'shadow-sm',
              'border',
              'border-gray-200',
              'my-4'
            ]
          }
        }
      }
    })
  }
}

const postsDirectory = path.join(process.cwd(), 'posts')
const tweetsDirectory = path.join(process.cwd(), 'tweets')

// 再帰的にposts配下の全.mdファイルのパスを取得
function getAllMarkdownFiles(dir: string, baseDir = dir): string[] {
  let results: string[] = []
  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(filePath, baseDir))
    } else if (file.endsWith('.md')) {
      // baseDirからの相対パス
      results.push(path.relative(baseDir, filePath))
    }
  })
  return results
}

export interface Post {
  id: string
  title: string
  date: string
  tags: string[]
  content?: string
  firstImage?: string | null
}

export interface Tweet {
  id: string
  content: string
  datetime: string
  date: string
  tags: string[]
}

export interface TagWithCount {
  tag: string
  count: number
}

export function getAllPosts(): Post[] {
  const filePaths = getAllMarkdownFiles(postsDirectory)
  const allPostsData = filePaths
    .map((relativePath) => {
      // idは拡張子なしの相対パス（例: 2024/01/01）
      const id = relativePath.replace(/\\/g, '/').replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, relativePath)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      return {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        tags: matterResult.data.tags || [],
      }
    })
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostData(id: string): Promise<Post> {
  // idはサブパス形式（例: 2024/01/01）
  const relativePath = id + '.md'
  const fullPath = path.join(postsDirectory, relativePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  // 最初の画像を抽出
  const firstImage = extractFirstImage(matterResult.content)
  // Use unified processor for correct handling of math with MathJax
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeImagePath) // 画像パス処理を追加
    .use(rehypeMathjax, {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
      },
    })
    .use(rehypeStringify)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()
  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    tags: matterResult.data.tags || [],
    content: contentHtml,
    firstImage,
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const allTags = posts.flatMap(post => post.tags)
  return [...new Set(allTags)].sort()
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts()
  return posts.filter(post => post.tags.includes(tag))
}

// 新機能: タグと投稿数を取得
export function getTagsWithCount(): TagWithCount[] {
  const posts = getAllPosts()
  const tagCounts: Record<string, number> = {}
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count) // 使用頻度順でソート
}

// 新機能: タグを使用頻度順で取得
export function getTagsByFrequency(): string[] {
  return getTagsWithCount().map(item => item.tag)
}

// 新機能: 複数タグでの投稿フィルタリング（AND検索）
export function getPostsByTags(tags: string[]): Post[] {
  if (tags.length === 0) return getAllPosts()
  
  const posts = getAllPosts()
  return posts.filter(post => 
    tags.every(tag => post.tags.includes(tag))
  )
}

// 新機能: 複数タグでの投稿フィルタリング（OR検索）
export function getPostsByTagsOr(tags: string[]): Post[] {
  if (tags.length === 0) return getAllPosts()
  
  const posts = getAllPosts()
  return posts.filter(post => 
    tags.some(tag => post.tags.includes(tag))
  )
}

// 新機能: 特定のタグの投稿数を取得
export function getPostCountByTag(tag: string): number {
  const posts = getAllPosts()
  return posts.filter(post => post.tags.includes(tag)).length
}

// カレンダー機能: 日付別投稿数を取得
export function getPostCountByDate(): Record<string, number> {
  const posts = getAllPosts()
  const dateCounts: Record<string, number> = {}
  
  posts.forEach(post => {
    const date = post.date
    dateCounts[date] = (dateCounts[date] || 0) + 1
  })
  
  return dateCounts
}

// カレンダー機能: 特定日付の投稿を取得
export function getPostsByDate(date: string): Post[] {
  const posts = getAllPosts()
  return posts.filter(post => post.date === date)
}

// カレンダー機能: 年月別の投稿数を取得
export function getPostCountByMonth(): Record<string, number> {
  const posts = getAllPosts()
  const monthCounts: Record<string, number> = {}
  
  posts.forEach(post => {
    const yearMonth = post.date.substring(0, 7) // YYYY-MM
    monthCounts[yearMonth] = (monthCounts[yearMonth] || 0) + 1
  })
  
  return monthCounts
}

// カレンダー機能: 投稿がある日付の一覧を取得
export function getPostDates(): string[] {
  const posts = getAllPosts()
  const dates = posts.map(post => post.date)
  return [...new Set(dates)].sort()
}

// カレンダー機能: 特定の年月の投稿を取得
export function getPostsByMonth(yearMonth: string): Post[] {
  const posts = getAllPosts()
  return posts.filter(post => post.date.startsWith(yearMonth))
} 

// ========== つぶやき関連機能 ==========

// つぶやきファイルの一覧を取得
function getAllTweetFiles(): string[] {
  if (!fs.existsSync(tweetsDirectory)) {
    return []
  }
  
  const files = fs.readdirSync(tweetsDirectory)
  return files.filter(file => file.endsWith('.json')).sort()
}

// 全つぶやきを取得
export function getAllTweets(): Tweet[] {
  const tweetFiles = getAllTweetFiles()
  const allTweets: Tweet[] = []
  
  tweetFiles.forEach(file => {
    const filePath = path.join(tweetsDirectory, file)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const tweets: Tweet[] = JSON.parse(fileContents)
    allTweets.push(...tweets)
  })
  
  // 日時順で降順ソート（新しいものから）
  return allTweets.sort((a, b) => {
    if (a.datetime < b.datetime) {
      return 1
    } else {
      return -1
    }
  })
}

// 特定日付のつぶやきを取得
export function getTweetsByDate(date: string): Tweet[] {
  const tweets = getAllTweets()
  return tweets.filter(tweet => tweet.date === date)
}

// つぶやきの全タグを取得
export function getAllTweetTags(): string[] {
  const tweets = getAllTweets()
  const allTags = tweets.flatMap(tweet => tweet.tags)
  return [...new Set(allTags)].sort()
}

// つぶやきのタグと投稿数を取得
export function getTweetTagsWithCount(): TagWithCount[] {
  const tweets = getAllTweets()
  const tagCounts: Record<string, number> = {}
  
  tweets.forEach(tweet => {
    tweet.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

// つぶやきの日付別投稿数を取得
export function getTweetCountByDate(): Record<string, number> {
  const tweets = getAllTweets()
  const dateCounts: Record<string, number> = {}
  
  tweets.forEach(tweet => {
    const date = tweet.date
    dateCounts[date] = (dateCounts[date] || 0) + 1
  })
  
  return dateCounts
}

// ========== 統合機能（記事とつぶやき両方） ==========

// 統合タグと投稿数を取得（記事+つぶやき）
export function getCombinedTagsWithCount(): TagWithCount[] {
  const postTags = getTagsWithCount()
  const tweetTags = getTweetTagsWithCount()
  const combinedTagCounts: Record<string, number> = {}
  
  // 記事のタグ集計
  postTags.forEach(({ tag, count }) => {
    combinedTagCounts[tag] = (combinedTagCounts[tag] || 0) + count
  })
  
  // つぶやきのタグ集計
  tweetTags.forEach(({ tag, count }) => {
    combinedTagCounts[tag] = (combinedTagCounts[tag] || 0) + count
  })
  
  return Object.entries(combinedTagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

// 統合日付別投稿数を取得（記事+つぶやき）
export function getCombinedPostCountByDate(): { 
  posts: Record<string, number>,
  tweets: Record<string, number>,
  total: Record<string, number>
} {
  const postCounts = getPostCountByDate()
  const tweetCounts = getTweetCountByDate()
  const totalCounts: Record<string, number> = {}
  
  // 全ての日付を集計
  const allDates = new Set([...Object.keys(postCounts), ...Object.keys(tweetCounts)])
  
  allDates.forEach(date => {
    const postCount = postCounts[date] || 0
    const tweetCount = tweetCounts[date] || 0
    totalCounts[date] = postCount + tweetCount
  })
  
  return {
    posts: postCounts,
    tweets: tweetCounts,
    total: totalCounts
  }
} 