import Link from 'next/link'
import { getPostData, getAllPosts, getPostCountByTag } from '../../../../lib/posts'
import CodeHighlight from './CodeHighlight'
import TableOfContents from './TableOfContents'
import HeadingAnchor from './HeadingAnchor'
import Navigation from '../../../components/Navigation'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    id: post.id,
  }))
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPostData(id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ナビゲーション */}
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm border p-8">
          {/* 記事ヘッダー */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => {
                const postCount = getPostCountByTag(tag)
                return (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="group bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm hover:bg-blue-200 transition-colors border border-blue-200 hover:border-blue-300"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-medium">#{tag}</span>
                      <span className="text-xs bg-blue-200 px-2 py-0.5 rounded-full group-hover:bg-blue-300 transition-colors">
                        {postCount}
                      </span>
                    </span>
                  </Link>
                )
              })}
            </div>
            
            {/* タグ一覧へのリンク */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/tags"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                すべてのタグを見る →
              </Link>
            </div>
          </header>

          {/* 目次 */}
          <TableOfContents content={post.content || ''} />

          {/* 記事本文 */}
          <CodeHighlight>
            <div
              className="prose prose-lg max-w-none 
                         prose-headings:text-gray-900 prose-headings:font-bold
                         prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:pb-3 prose-h1:border-b prose-h1:border-gray-200
                         prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100
                         prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:font-semibold
                         prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-h4:font-semibold
                         prose-h5:text-lg prose-h5:mb-2 prose-h5:mt-4 prose-h5:font-semibold
                         prose-h6:text-base prose-h6:mb-2 prose-h6:mt-4 prose-h6:font-semibold
                         prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                         prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-800 hover:prose-a:underline
                         prose-strong:text-gray-900 prose-strong:font-semibold
                         prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-gray-800
                         prose-pre:bg-gray-100 prose-pre:text-gray-900 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:border prose-pre:border-gray-200
                         prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                         prose-ul:mb-4 prose-ol:mb-4
                         prose-li:text-gray-700 prose-li:mb-1
                         prose-table:border-collapse prose-table:w-full
                         prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
                         prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          </CodeHighlight>

          {/* 見出しアンカーリンク機能 */}
          <HeadingAnchor />
        </article>
      </div>
    </div>
  )
} 