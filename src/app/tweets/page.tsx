import { Metadata } from 'next'
import Link from 'next/link'
import { getAllTweets } from '../../../lib/posts'
import { HiChatBubbleBottomCenterText, HiArrowLeft } from 'react-icons/hi2'

export const metadata: Metadata = {
  title: 'つぶやき一覧 - 学習記録',
  description: '日々のつぶやきを時系列で確認できます。学習の記録や気づきなど、気軽な投稿をまとめています。',
  openGraph: {
    title: 'つぶやき一覧 - 学習記録',
    description: '日々のつぶやきを時系列で確認できます。学習の記録や気づきなど、気軽な投稿をまとめています。',
    type: 'website',
    images: [
      {
        url: '/api/og?title=つぶやき一覧&subtitle=日々の学習記録とつぶやき&type=tweets',
        width: 1200,
        height: 630,
        alt: 'つぶやき一覧 - 学習記録',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'つぶやき一覧 - 学習記録',
    description: '日々のつぶやきを時系列で確認できます。学習の記録や気づきなど、気軽な投稿をまとめています。',
    images: ['/api/og?title=つぶやき一覧&subtitle=日々の学習記録とつぶやき&type=tweets'],
  },
}

export default function TweetsPage() {
  const tweets = getAllTweets()

  // 日時のフォーマット
  const formatDateTime = (datetimeString: string) => {
    const date = new Date(datetimeString)
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // 相対時間のフォーマット
  const formatRelativeTime = (datetimeString: string) => {
    const now = new Date()
    const tweetDate = new Date(datetimeString)
    const diffMs = now.getTime() - tweetDate.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      return diffMinutes < 1 ? '今' : `${diffMinutes}分前`
    } else if (diffHours < 24) {
      return `${diffHours}時間前`
    } else if (diffDays < 7) {
      return `${diffDays}日前`
    } else {
      return formatDateTime(datetimeString).split(' ')[0] // 日付のみ
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <HiChatBubbleBottomCenterText className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">つぶやき一覧</h1>
          </div>
          <p className="text-gray-600">日々の学習記録や気づきを気軽に投稿</p>
          <p className="text-sm text-gray-500 mt-2">
            全{tweets.length}件のつぶやき
          </p>
        </div>

        {/* つぶやき一覧 */}
        <div className="space-y-4">
          {tweets.length > 0 ? (
            tweets.map((tweet) => (
              <article
                key={tweet.id}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <HiChatBubbleBottomCenterText className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    {/* つぶやき内容 */}
                    <p className="text-gray-900 text-lg leading-relaxed mb-4 whitespace-pre-wrap">
                      {tweet.content}
                    </p>

                    {/* タグ */}
                    {tweet.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tweet.tags.map((tag) => (
                          <Link
                            key={tag}
                            href={`/tags/${encodeURIComponent(tag)}`}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors border border-blue-200 hover:border-blue-300"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* 投稿日時 */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>{formatDateTime(tweet.datetime)}</span>
                        <span className="text-blue-600 font-medium">
                          {formatRelativeTime(tweet.datetime)}
                        </span>
                      </div>
                      <Link
                        href={`/calendar/${tweet.date}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        この日の投稿を見る →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            /* つぶやきが0件の場合 */
            <div className="text-center py-12">
              <HiChatBubbleBottomCenterText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">まだつぶやきがありません</p>
              <p className="text-gray-400 text-sm">
                tweetsディレクトリにJSONファイルを追加してください
              </p>
            </div>
          )}
        </div>

        {/* フッター情報 */}
        {tweets.length > 0 && (
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              つぶやきは時系列順（新しい順）で表示されています
            </p>
            <div className="mt-4 space-x-4">
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