import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostsByDate, getTweetsByDate } from '../../../../lib/posts'
import { HiArrowLeft, HiCalendarDays, HiDocumentText, HiChatBubbleBottomCenterText } from 'react-icons/hi2'

interface DatePageProps {
  params: Promise<{
    date: string
  }>
}

export async function generateMetadata({ params }: DatePageProps): Promise<Metadata> {
  const { date } = await params
  const posts = getPostsByDate(date)
  const tweets = getTweetsByDate(date)
  const totalCount = posts.length + tweets.length
  
  return {
    title: `${date}の投稿 - 学習記録`,
    description: `${date}に投稿された記事・つぶやき一覧です。記事${posts.length}件、つぶやき${tweets.length}件の合計${totalCount}件の投稿があります。`,
  }
}

export default async function DatePage({ params }: DatePageProps) {
  const { date } = await params
  const posts = getPostsByDate(date)
  const tweets = getTweetsByDate(date)
  const totalCount = posts.length + tweets.length
  
  // 日付が無効または投稿がない場合は404
  if (totalCount === 0) {
    notFound()
  }
  
  // 記事とつぶやきを時系列で統合してソート
  const allItems = [
    ...posts.map(post => ({ ...post, type: 'post' as const, datetime: `${post.date}T00:00:00` })),
    ...tweets.map(tweet => ({ ...tweet, type: 'tweet' as const }))
  ].sort((a, b) => {
    if (a.datetime < b.datetime) {
      return 1
    } else {
      return -1
    }
  })
  
  // 日付のフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  }
  
  // 時刻のフォーマット
  const formatTime = (datetimeString: string) => {
    const date = new Date(datetimeString)
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* ヘッダー */}
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/calendar"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <HiArrowLeft className="w-5 h-5" />
              <span>カレンダーに戻る</span>
            </Link>
          </div>
          
          {/* タイトル */}
          <div className="flex items-center space-x-3 mb-6">
            <HiCalendarDays className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{formatDate(date)}</h1>
              <p className="text-gray-600 mt-1">
                記事{posts.length}件、つぶやき{tweets.length}件（合計{totalCount}件）
              </p>
            </div>
          </div>
          
          {/* 投稿一覧（時系列） */}
          <div className="space-y-4">
            {allItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                {item.type === 'post' ? (
                  /* 記事の表示 */
                  <Link href={`/posts/${item.id}`} className="block">
                    <div className="flex items-start space-x-3">
                      <HiDocumentText className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                          {item.title}
                        </h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              記事
                            </span>
                            <span>{item.date}</span>
                          </span>
                          {item.tags.length > 0 && (
                            <div className="flex items-center space-x-2">
                              <span>タグ:</span>
                              <div className="flex flex-wrap gap-1">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  /* つぶやきの表示 */
                  <div className="flex items-start space-x-3">
                    <HiChatBubbleBottomCenterText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          つぶやき
                        </span>
                        <span className="text-sm text-gray-600">
                          {formatTime(item.datetime)}
                        </span>
                      </div>
                      <p className="text-gray-900 mb-2 whitespace-pre-wrap">{item.content}</p>
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag) => (
                            <Link
                              key={tag}
                              href={`/tags/${encodeURIComponent(tag)}`}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                            >
                              #{tag}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 