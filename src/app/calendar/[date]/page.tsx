import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostsByDate } from '../../../../lib/posts'
import { HiArrowLeft, HiCalendarDays } from 'react-icons/hi2'

interface DatePageProps {
  params: Promise<{
    date: string
  }>
}

export async function generateMetadata({ params }: DatePageProps): Promise<Metadata> {
  const { date } = await params
  const posts = getPostsByDate(date)
  
  return {
    title: `${date}の投稿 - 学習記録`,
    description: `${date}に投稿された記事一覧です。`,
  }
}

export default async function DatePage({ params }: DatePageProps) {
  const { date } = await params
  const posts = getPostsByDate(date)
  
  // 日付が無効または投稿がない場合は404
  if (!posts || posts.length === 0) {
    notFound()
  }
  
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
              <p className="text-gray-600 mt-1">{posts.length}件の投稿</p>
            </div>
          </div>
          
          {/* 投稿一覧 */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <Link href={`/posts/${post.id}`} className="block">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{post.date}</span>
                    {post.tags.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span>タグ:</span>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 