import Link from 'next/link'
import { getPostsByTag, getAllTags } from '../../../../lib/posts'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)
  
  const ogImageUrl = `/api/og?title=${encodeURIComponent(decodedTag)}&subtitle=${encodeURIComponent(`${posts.length}件の記事があります`)}&type=tag`
  
  return {
    title: `${decodedTag} - 学習記録`,
    description: `「${decodedTag}」タグの記事一覧です。${posts.length}件の記事があります。`,
    openGraph: {
      title: `${decodedTag} - 学習記録`,
      description: `「${decodedTag}」タグの記事一覧です。${posts.length}件の記事があります。`,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${decodedTag} - 学習記録`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${decodedTag} - 学習記録`,
      description: `「${decodedTag}」タグの記事一覧です。${posts.length}件の記事があります。`,
      images: [ogImageUrl],
    },
  }
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-block"
          >
            ← 学習記録一覧に戻る
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            タグ: {decodedTag}
          </h1>
          <p className="text-gray-600 mt-1">
            {posts.length}件の記事があります
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 記事一覧 */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link
                    href={`/posts/${post.id}`}
                    className="block group"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${encodeURIComponent(tag)}`}
                        className={`px-2 py-1 rounded text-xs transition-colors ${
                          tag === decodedTag
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 記事が0件の場合 */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              「{decodedTag}」タグの記事がありません。
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 