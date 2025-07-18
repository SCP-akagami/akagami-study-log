import Link from 'next/link'
import { getTagsWithCount } from '../../../lib/posts'
import TagCloud from '../../components/TagCloud'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'タグ一覧 - 学習記録',
  description: '学習記録で使用されているタグの一覧です。タグ別に記事を探すことができます。',
  openGraph: {
    title: 'タグ一覧 - 学習記録',
    description: '学習記録で使用されているタグの一覧です。タグ別に記事を探すことができます。',
    type: 'website',
    images: [
      {
        url: '/api/og?title=タグ一覧&subtitle=学習記録で使用されているタグの一覧&type=tags',
        width: 1200,
        height: 630,
        alt: 'タグ一覧 - 学習記録',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'タグ一覧 - 学習記録',
    description: '学習記録で使用されているタグの一覧です。タグ別に記事を探すことができます。',
    images: ['/api/og?title=タグ一覧&subtitle=学習記録で使用されているタグの一覧&type=tags'],
  },
}

export default function TagsPage() {
  const tagsWithCount = getTagsWithCount()

  return (
    <div className="min-h-screen bg-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">タグ一覧</h1>
          <p className="text-gray-600">学習記録で使用されているタグの一覧です</p>
        </div>

        {/* タグ統計 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">統計情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{tagsWithCount.length}</div>
              <div className="text-sm text-gray-600">総タグ数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {tagsWithCount.reduce((sum, item) => sum + item.count, 0)}
              </div>
              <div className="text-sm text-gray-600">総投稿数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {tagsWithCount.length > 0 ? Math.round(tagsWithCount.reduce((sum, item) => sum + item.count, 0) / tagsWithCount.length * 10) / 10 : 0}
              </div>
              <div className="text-sm text-gray-600">平均投稿数/タグ</div>
            </div>
          </div>
        </div>

        {/* タグ一覧 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">タグ一覧（使用頻度順）</h2>
          
          {tagsWithCount.length === 0 ? (
            <p className="text-gray-500 text-center py-8">タグが見つかりませんでした。</p>
          ) : (
            <div className="space-y-3">
              {tagsWithCount.map(({ tag, count }) => (
                <div key={tag} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Link 
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="flex-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                        #{tag}
                      </span>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">
                          {count}件の投稿
                        </span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${Math.max(10, (count / Math.max(...tagsWithCount.map(t => t.count))) * 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* タグクラウド */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">タグクラウド</h2>
          <TagCloud tags={tagsWithCount} />
        </div>
      </div>
    </div>
  )
} 