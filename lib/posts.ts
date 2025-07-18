import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'

// 画像パスを処理するプラグイン
function rehypeImagePath() {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        const src = node.properties.src
        if (src && typeof src === 'string') {
          // 相対パスの場合は/images/に変換
          if (!src.startsWith('http') && !src.startsWith('/')) {
            node.properties.src = `/images/${src}`
          }
          // 画像にレスポンシブ対応のCSSクラスを追加
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
    })
  }
}

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  id: string
  title: string
  date: string
  tags: string[]
  content?: string
}

export interface TagWithCount {
  tag: string
  count: number
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
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
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  
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