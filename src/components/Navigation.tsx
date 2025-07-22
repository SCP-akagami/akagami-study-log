'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { HiHome, HiTag, HiBookOpen, HiCalendarDays, HiChatBubbleBottomCenterText } from 'react-icons/hi2'

export default function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { name: 'ホーム', path: '/', icon: HiHome },
    { name: 'つぶやき', path: '/tweets', icon: HiChatBubbleBottomCenterText },
    { name: 'カレンダー', path: '/calendar', icon: HiCalendarDays },
    { name: 'タグ一覧', path: '/tags', icon: HiTag },
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* デスクトップメニュー */}
          <div className="hidden sm:flex sm:space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`inline-flex items-center space-x-2 px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* モバイルメニューボタン */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 text-base font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 