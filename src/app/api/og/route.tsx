import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || '学習記録'
    const date = searchParams.get('date') || ''
    const tags = searchParams.get('tags') || ''
    
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
            backgroundColor: '#f8fafc',
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
          }}
        >
          {/* 背景のグラデーション装飾 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%)',
            }}
          />
          
          {/* メインコンテンツ */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              padding: '60px 80px',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: '1000px',
              margin: '0 40px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* サイトロゴ/タイトル */}
            <div
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#6b7280',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              📚 学習記録
            </div>
            
            {/* 記事タイトル */}
            <div
              style={{
                fontSize: title.length > 30 ? '48px' : '56px',
                fontWeight: '800',
                color: '#111827',
                textAlign: 'center',
                lineHeight: '1.2',
                marginBottom: '30px',
                maxWidth: '100%',
              }}
            >
              {title}
            </div>
            
            {/* 日付 */}
            {formattedDate && (
              <div
                style={{
                  fontSize: '20px',
                  color: '#6b7280',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
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
                  gap: '12px',
                  justifyContent: 'center',
                }}
              >
                {tagList.map((tag, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      padding: '8px 20px',
                      borderRadius: '20px',
                      fontSize: '18px',
                      fontWeight: '500',
                      border: '2px solid #93c5fd',
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
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '16px',
              fontWeight: '500',
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
  } catch (e: any) {
    console.error('OG画像生成エラー:', e)
    return new Response('画像生成に失敗しました', { status: 500 })
  }
} 