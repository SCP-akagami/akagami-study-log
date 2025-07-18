'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

interface CalendarProps {
  postCountByDate: Record<string, number>
}

export default function Calendar({ postCountByDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  
  // 月の最初の日と最後の日を取得
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  
  // 月の最初の日が何曜日かを取得（0: 日曜日, 1: 月曜日, ...）
  const firstDayOfWeek = firstDayOfMonth.getDay()
  
  // 月の日数を取得
  const daysInMonth = lastDayOfMonth.getDate()
  
  // 前月に戻る
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }
  
  // 次月に進む
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }
  
  // 日付フォーマット関数
  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }
  
  // 月名の配列
  const monthNames = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ]
  
  // 曜日の配列
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']
  
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* カレンダーヘッダー */}
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="前の月"
        >
          <HiChevronLeft className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-semibold text-gray-900">
          {currentYear}年 {monthNames[currentMonth]}
        </h2>
        
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="次の月"
        >
          <HiChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* カレンダーグリッド */}
      <div className="p-4">
        {/* 曜日ヘッダー */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day, index) => (
            <div key={index} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* 日付グリッド */}
        <div className="grid grid-cols-7 gap-1">
          {/* 前月の空白部分 */}
          {Array.from({ length: firstDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="h-12"></div>
          ))}
          
          {/* 現在の月の日付 */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1
            const dateString = formatDate(currentYear, currentMonth, day)
            const postCount = postCountByDate[dateString] || 0
            const hasPost = postCount > 0
            
            return (
              <div key={day} className="h-12 relative">
                {hasPost ? (
                  <Link
                    href={`/calendar/${dateString}`}
                    className="w-full h-full flex flex-col items-center justify-center rounded-md border hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer"
                  >
                    <span className="text-sm text-gray-900">{day}</span>
                    <span className="text-xs text-blue-600 font-medium">
                      {postCount}
                    </span>
                  </Link>
                ) : (
                  <div className="w-full h-full flex items-center justify-center rounded-md border border-gray-200">
                    <span className="text-sm text-gray-400">{day}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      
      {/* 凡例 */}
      <div className="px-4 pb-4 border-t">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-gray-200 rounded"></div>
            <span>投稿なし</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-blue-300 bg-blue-50 rounded"></div>
            <span>投稿あり（クリック可能）</span>
          </div>
        </div>
      </div>
    </div>
  )
} 