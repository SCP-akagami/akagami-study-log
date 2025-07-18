import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || '学習記録'
    const date = searchParams.get('date') || ''
    const tags = searchParams.get('tags') || ''
    const type = searchParams.get('type') || 'article' // 'home', 'tags', 'tag', 'article'
    const subtitle = searchParams.get('subtitle') || ''
    
    // タグを配列に変換
    const tagList = tags ? tags.split(',').slice(0, 3) : []
    
    // 日付をフォーマット
    const formatDate = (dateString: string): string => {
      if (!dateString) return ''
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${year}年${month}月${day}日`
    }
    
    const formattedDate = formatDate(date)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
            position: 'relative',
          }}
        >
          {/* 背景の装飾パターン */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 100%)',
              opacity: 0.9,
            }}
          />
          
          {/* 装飾的な円 */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              opacity: 0.7,
            }}
          />
          
          <div
            style={{
              position: 'absolute',
              bottom: '-150px',
              left: '-150px',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              opacity: 0.8,
            }}
          />
          
          {/* メインコンテンツ */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              padding: '60px 80px',
              borderRadius: '32px',
              boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              maxWidth: '1000px',
              margin: '0 40px',
              position: 'relative',
              zIndex: 1,
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* サイトロゴ/タイトル */}
            <div
              style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#4f46e5',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              📚 学習記録
            </div>
            
            {/* タイトル */}
            <div
              style={{
                fontSize: title.length > 40 ? '44px' : title.length > 30 ? '52px' : '64px',
                fontWeight: '900',
                color: '#0f172a',
                textAlign: 'center',
                lineHeight: '1.1',
                marginBottom: subtitle || formattedDate || tagList.length > 0 ? '32px' : '0px',
                maxWidth: '100%',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                letterSpacing: '-0.025em',
              }}
            >
              {title}
            </div>
            
            {/* サブタイトル */}
            {subtitle && (
              <div
                style={{
                  fontSize: '26px',
                  color: '#475569',
                  marginBottom: '24px',
                  textAlign: 'center',
                  fontWeight: '600',
                  opacity: 0.9,
                  letterSpacing: '-0.01em',
                }}
              >
                {subtitle}
              </div>
            )}
            
            {/* 日付（記事の場合のみ） */}
            {formattedDate && type === 'article' && (
              <div
                style={{
                  fontSize: '22px',
                  color: '#6366f1',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '600',
                  background: 'rgba(99, 102, 241, 0.1)',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                }}
              >
                📅 {formattedDate}
              </div>
            )}
            
            {/* タグ */}
            {tagList.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  justifyContent: 'center',
                }}
              >
                {tagList.map((tag, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      color: '#1e40af',
                      padding: '10px 24px',
                      borderRadius: '24px',
                      fontSize: '20px',
                      fontWeight: '600',
                      border: '2px solid rgba(59, 130, 246, 0.3)',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    #{tag.trim()}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* 下部の装飾 */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '18px',
              fontWeight: '600',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '8px 16px',
              borderRadius: '16px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            study-log
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    console.error('OG画像生成エラー:', e)
    return new Response('画像生成に失敗しました', { status: 500 })
  }
} 