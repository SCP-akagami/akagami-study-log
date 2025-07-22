import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getPostCountByTag } from '../../../lib/posts'
import { HiDocumentText, HiArrowLeft } from 'react-icons/hi2'

export const metadata: Metadata = {
  title: '記事一覧 - 学習記録',
  description: '学習記録の全記事を時系列で確認できます。プログラミングやWeb開発に関する学習内容をまとめています。',
  openGraph: {
    title: '記事一覧 - 学習記録',
    description: '学習記録の全記事を時系列で確認できます。プログラミングやWeb開発に関する学習内容をまとめています。',
    type: 'website',
    images: [
      {
        url: '/api/og?title=記事一覧&subtitle=学習記録の全記事&type=posts',
        width: 1200,
        height: 630,
        alt: '記事一覧 - 学習記録',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '記事一覧 - 学習記録',
    description: '学習記録の全記事を時系列で確認できます。プログラミングやWeb開発に関する学習内容をまとめています。',
    images: ['/api/og?title=記事一覧&subtitle=学習記録の全記事&type=posts'],
  },
}

export default function PostsPage() {
  const posts = getAllPosts()

  // 日付のフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // 相対時間のフォーマット
  const formatRelativeTime = (dateString: string) => {
    const now = new Date()
    const postDate = new Date(dateString)
    const diffMs = now.getTime() - postDate.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return '今日'
    } else if (diffDays === 1) {
      return '昨日'
    } else if (diffDays < 7) {
      return `${diffDays}日前`
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return `${weeks}週間前`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `${months}ヶ月前`
    } else {
      const years = Math.floor(diffDays / 365)
      return `${years}年前`
    }
  }

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <HiDocumentText className="w-10 h-10 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">記事一覧</h1>
          </div>
          <p className="text-gray-600">学習記録の全記事を時系列で確認</p>
          <p className="text-sm text-gray-500 mt-2">
            全{posts.length}件の記事
          </p>
        </div>

        {/* 記事一覧 */}
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <HiDocumentText className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <Link
                      href={`/posts/${post.id}`}
                      className="block group"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                        {post.title}
                      </h2>
                    </Link>

                    {/* 投稿日時 */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span>{formatDate(post.date)}</span>
                        <span className="text-green-600 font-medium">
                          {formatRelativeTime(post.date)}
                        </span>
                      </div>
                      <Link
                        href={`/calendar/${post.date}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        この日の投稿を見る →
                      </Link>
                    </div>

                    {/* タグ */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => {
                          const postCount = getPostCountByTag(tag)
                          return (
                            <Link
                              key={tag}
                              href={`/tags/${encodeURIComponent(tag)}`}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors border border-green-200 hover:border-green-300"
                            >
                              <span className="flex items-center gap-1">
                                <span>#{tag}</span>
                                <span className="text-xs bg-green-200 px-1.5 py-0.5 rounded-full">
                                  {postCount}
                                </span>
                              </span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))
          ) : (
            /* 記事が0件の場合 */
            <div className="text-center py-12">
              <HiDocumentText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">まだ記事がありません</p>
              <p className="text-gray-400 text-sm">
                postsディレクトリにMarkdownファイルを追加してください
              </p>
            </div>
          )}
        </div>

        {/* フッター情報 */}
        {posts.length > 0 && (
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              記事は時系列順（新しい順）で表示されています
            </p>
            <div className="mt-4 space-x-4">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
              >
                🏠 ホームに戻る
              </Link>
              <Link
                href="/calendar"
                className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
              >
                📅 カレンダーで見る
              </Link>
              <Link
                href="/tags"
                className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
              >
                🏷️ タグ一覧で探す
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 