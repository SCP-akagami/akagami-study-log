import Link from 'next/link'
import { getPostData, getAllPosts } from '../../../../lib/posts'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    id: post.id,
  }))
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPostData(id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← 学習記録一覧に戻る
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm border p-8">
          {/* 記事ヘッダー */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </header>

          {/* 記事本文 */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </article>
      </div>
    </div>
  )
} 