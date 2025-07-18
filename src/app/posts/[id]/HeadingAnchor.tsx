'use client'

import { useEffect } from 'react'

export default function HeadingAnchor() {
  useEffect(() => {
    // 見出し要素にアンカーリンクを追加
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
    headings.forEach((heading) => {
      if (!heading.id) return
      
      // アンカーリンクボタンを作成
      const anchorButton = document.createElement('button')
      anchorButton.className = 'anchor-link opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-gray-400 hover:text-blue-600'
      anchorButton.innerHTML = '🔗'
      anchorButton.setAttribute('aria-label', 'このセクションへのリンクをコピー')
      anchorButton.style.fontSize = '0.8em'
      anchorButton.style.verticalAlign = 'middle'
      
      // クリック時の処理
      anchorButton.addEventListener('click', async (e) => {
        e.preventDefault()
        const url = `${window.location.origin}${window.location.pathname}#${heading.id}`
        
        try {
          await navigator.clipboard.writeText(url)
          // 成功時の視覚的フィードバック
          anchorButton.innerHTML = '✅'
          setTimeout(() => {
            anchorButton.innerHTML = '🔗'
          }, 1000)
        } catch {
          // フォールバック: URLをアドレスバーに設定
          window.location.hash = heading.id
        }
      })
      
      // 見出し要素にグループクラスを追加
      heading.classList.add('group', 'relative')
      
      // 既存のアンカーリンクがない場合のみ追加
      if (!heading.querySelector('.anchor-link')) {
        heading.appendChild(anchorButton)
      }
    })
    
    // URLのハッシュがある場合、該当する見出しにスクロール
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [])

  return null
} 