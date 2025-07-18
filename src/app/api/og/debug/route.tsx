import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Debug Test'
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            color: 'white',
            fontSize: '48px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {title}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    console.error('Debug OG画像生成エラー:', e)
    return new Response(`Debug Error: ${e instanceof Error ? e.message : 'Unknown error'}`, { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }
} 