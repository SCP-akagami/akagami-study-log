import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

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
  
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
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