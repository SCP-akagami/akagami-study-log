'use client'

import Link from 'next/link'
import { TagWithCount } from '../../lib/posts'

interface TagCloudProps {
  tags: TagWithCount[]
  maxTags?: number
  className?: string
}

export default function TagCloud({ tags, maxTags = 20, className = '' }: TagCloudProps) {
  if (tags.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">タグがありません</p>
      </div>
    )
  }

  const displayTags = tags.slice(0, maxTags)
  const maxCount = Math.max(...displayTags.map(t => t.count))
  const minCount = Math.min(...displayTags.map(t => t.count))

  // サイズとカラーを計算する関数
  const getTagStyle = (count: number) => {
    const normalizedCount = maxCount === minCount ? 1 : (count - minCount) / (maxCount - minCount)
    
    // サイズ計算（0.8rem〜2.2rem）
    const minSize = 0.8
    const maxSize = 2.2
    const fontSize = minSize + (maxSize - minSize) * normalizedCount
    
    // カラー計算（使用頻度に応じて色を変更）
    let colorClasses = ''
    if (normalizedCount >= 0.8) {
      colorClasses = 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200'
    } else if (normalizedCount >= 0.6) {
      colorClasses = 'bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200'
    } else if (normalizedCount >= 0.4) {
      colorClasses = 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200'
    } else if (normalizedCount >= 0.2) {
      colorClasses = 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200'
    } else {
      colorClasses = 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200'
    }
    
    return {
      fontSize: `${fontSize}rem`,
      colorClasses
    }
  }

  return (
    <div className={`${className}`}>
      <div className="flex flex-wrap gap-3 justify-center">
        {displayTags.map(({ tag, count }) => {
          const { fontSize, colorClasses } = getTagStyle(count)
          
          return (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className={`inline-flex items-center px-3 py-1 rounded-full font-medium transition-all duration-200 transform hover:scale-105 border ${colorClasses}`}
              style={{ fontSize }}
              title={`${tag} (${count}件の投稿)`}
            >
              <span className="mr-1">#</span>
              <span>{tag}</span>
              <span className="ml-2 text-xs opacity-75 bg-white bg-opacity-50 px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            </Link>
          )
        })}
      </div>
      
      {/* 凡例 */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-2">使用頻度</p>
        <div className="flex justify-center gap-2 text-xs">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-200 rounded-full"></div>
            <span>高</span>
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-200 rounded-full"></div>
            <span>中高</span>
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-200 rounded-full"></div>
            <span>中</span>
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-200 rounded-full"></div>
            <span>中低</span>
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
            <span>低</span>
          </span>
        </div>
      </div>
    </div>
  )
} 