'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // HTMLから見出しを抽出
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
    const tocItems: TocItem[] = []
    const usedIds = new Set<string>()
    
    headings.forEach((heading, index) => {
      const text = heading.textContent || ''
      const level = parseInt(heading.tagName.charAt(1))
      
      // IDを生成（重複を避ける）
      let id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
      
      if (usedIds.has(id)) {
        id = `${id}-${index}`
      }
      usedIds.add(id)
      
      tocItems.push({ id, text, level })
    })
    
    setToc(tocItems)
  }, [content, mounted])

  useEffect(() => {
    if (!mounted || toc.length === 0) return
    
    // 実際のDOM要素にIDを設定
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach((heading, index) => {
      if (toc[index]) {
        heading.id = toc[index].id
      }
    })

    // スクロール時のアクティブな見出しを追跡
    const handleScroll = () => {
      const headingElements = Array.from(headings)
      const scrollTop = window.scrollY + 100 // オフセット

      let activeHeading = ''
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i] as HTMLElement
        if (element.offsetTop <= scrollTop) {
          activeHeading = element.id
          break
        }
      }
      setActiveId(activeHeading)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初期化

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [toc, mounted])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // サーバーサイドレンダリング時は何も表示しない
  if (!mounted || toc.length === 0) {
    return null
  }

  return (
    <div className="bg-gray-50 border rounded-lg p-4 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">目次</h2>
      <nav>
        <ul className="space-y-1">
          {toc.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`block w-full text-left text-sm transition-colors hover:text-blue-600 ${
                  activeId === item.id
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600'
                }`}
                style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
} 