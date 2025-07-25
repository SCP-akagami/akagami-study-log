import { Metadata } from 'next'
import { getCombinedPostCountByDate } from '../../../lib/posts'
import Calendar from '@/components/Calendar'

export const metadata: Metadata = {
  title: 'カレンダー - 学習記録',
  description: '投稿を日付別に確認できるカレンダービューです。',
}

export default function CalendarPage() {
  const combinedCounts = getCombinedPostCountByDate()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">カレンダー</h1>
          <p className="text-gray-600 mb-8">
            投稿された記事・つぶやきを日付別に確認できます。数字がある日付をクリックすると、その日の投稿一覧が表示されます。
          </p>
          
          <Calendar combinedCounts={combinedCounts} />
        </div>
      </div>
    </div>
  )
} 