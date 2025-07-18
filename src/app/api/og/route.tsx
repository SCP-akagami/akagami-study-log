import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// デバッグ用のシンプルなOG画像生成
function generateSimpleOGImage(title: string, date: string, tags: string) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          padding: '60px',
          borderRadius: '20px',
          maxWidth: '1000px',
          margin: '40px',
        }}
      >
        <div
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#4f46e5',
            marginBottom: '20px',
          }}
        >
          📚 学習記録
        </div>
        <div
          style={{
            fontSize: title.length > 40 ? '36px' : '48px',
            fontWeight: 'bold',
            color: '#0f172a',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          {title}
        </div>
        {date && (
          <div
            style={{
              fontSize: '24px',
              color: '#6366f1',
              marginBottom: '20px',
            }}
          >
            📅 {new Date(date).toLocaleDateString('ja-JP')}
          </div>
        )}
        {tags && (
          <div
            style={{
              fontSize: '20px',
              color: '#1e40af',
            }}
          >
            🏷️ {tags.split(',').map(tag => `#${tag.trim()}`).join(' ')}
          </div>
        )}
      </div>
    </div>
  )
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || '学習記録'
    const date = searchParams.get('date') || ''
    const tags = searchParams.get('tags') || ''
    
    console.log('OG画像生成開始:', { title, date, tags })

    return new ImageResponse(
      generateSimpleOGImage(title, date, tags),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    console.error('OG画像生成エラー:', e)
    return new Response(`画像生成に失敗しました: ${e instanceof Error ? e.message : '不明なエラー'}`, { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }
} 