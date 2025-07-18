import Link from 'next/link'
import { getAllPosts, getAllTags, getTagsWithCount, getPostCountByTag } from '../../lib/posts'
import TagCloud from '../components/TagCloud'
import { HiOutlineGlobeAlt } from 'react-icons/hi2'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '学習記録 - 日々の学びを記録するサイト',
  description: '個人の学習記録をMarkdownで管理し、静的なWebサイトとして公開。プログラミングやWeb開発に関する学習内容を記録しています。',
  openGraph: {
    title: '学習記録 - 日々の学びを記録するサイト',
    description: '個人の学習記録をMarkdownで管理し、静的なWebサイトとして公開。プログラミングやWeb開発に関する学習内容を記録しています。',
    type: 'website',
    images: [
      {
        url: '/api/og?title=学習記録&subtitle=日々の学びを記録するサイト&type=home',
        width: 1200,
        height: 630,
        alt: '学習記録 - 日々の学びを記録するサイト',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '学習記録 - 日々の学びを記録するサイト',
    description: '個人の学習記録をMarkdownで管理し、静的なWebサイトとして公開。プログラミングやWeb開発に関する学習内容を記録しています。',
    images: ['/api/og?title=学習記録&subtitle=日々の学びを記録するサイト&type=home'],
  },
}

export default function Home() {
  const posts = getAllPosts()
  const allTags = getAllTags()
  const tagsWithCount = getTagsWithCount()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-gray-600 mb-3">赤神の日々の学習を記録しています</p>
            <div className="flex items-center justify-center gap-2">
              <HiOutlineGlobeAlt className="w-4 h-4 text-gray-500" />
              <a
                href="https://x.com/SoraAkagami0709"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
              >
                @SoraAkagami0709
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 統計情報 */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
              <div className="text-sm text-gray-600">総投稿数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{allTags.length}</div>
              <div className="text-sm text-gray-600">タグ数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {posts.length > 0 ? Math.round(allTags.length / posts.length * 10) / 10 : 0}
              </div>
              <div className="text-sm text-gray-600">平均タグ数/投稿</div>
            </div>
          </div>
        </div>

        {/* 人気タグ */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">人気タグ</h2>
            <Link
              href="/tags"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              すべて見る →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {tagsWithCount.slice(0, 10).map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="group bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm hover:bg-blue-200 transition-colors border border-blue-200 hover:border-blue-300"
              >
                <span className="flex items-center gap-1">
                  <span className="font-medium">#{tag}</span>
                  <span className="text-xs bg-blue-200 px-1.5 py-0.5 rounded-full group-hover:bg-blue-300 transition-colors">
                    {count}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* タグクラウド */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">タグクラウド</h2>
          <TagCloud tags={tagsWithCount} maxTags={15} />
        </div>

        {/* 記事一覧 */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link
                    href={`/posts/${post.id}`}
                    className="block group"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => {
                      const postCount = getPostCountByTag(tag)
                      return (
                        <Link
                          key={tag}
                          href={`/tags/${encodeURIComponent(tag)}`}
                          className="group bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-200 transition-colors"
                        >
                          <span className="flex items-center gap-1">
                            <span>#{tag}</span>
                            <span className="text-xs bg-gray-200 px-1 py-0.5 rounded group-hover:bg-gray-300 transition-colors">
                              {postCount}
                            </span>
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 記事が0件の場合 */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">まだ学習記録がありません。</p>
            <p className="text-gray-400 text-sm mt-2">
              postsディレクトリにMarkdownファイルを追加してください。
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
