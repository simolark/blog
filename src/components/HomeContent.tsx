'use client'

import Link from 'next/link'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  tags?: string[]
  readingTime?: {
    en: string
    zh: string
  }
}

interface HomeContentProps {
  posts: Post[]
}

export default function HomeContent({ posts }: HomeContentProps) {
  // 按年份分组文章
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {} as Record<number, Post[]>)

  // 获取排序后的年份列表（从新到旧）
  const sortedYears = Object.keys(postsByYear).map(Number).sort((a, b) => b - a)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Articles by Year */}
      <div className="space-y-12 sm:space-y-16">
        {sortedYears.map((year) => (
          <div key={year} className="relative">
            <div className="flex items-center mb-8 sm:mb-10">
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{year}</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-200 via-purple-200 to-transparent ml-6"></div>
              <div className="liquid-glass px-4 py-2 rounded-full text-sm text-gray-700 font-medium backdrop-blur-lg border border-white/20">
                {postsByYear[year].length} {postsByYear[year].length === 1 ? 'article' : 'articles'}
              </div>
            </div>
            
            <div className="grid gap-6 sm:gap-8">
              {postsByYear[year].map((post, index) => (
                <article key={post.slug} className="relative">
                  <div className="relative liquid-glass rounded-3xl p-6 sm:p-8 backdrop-blur-lg border border-white/20">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white font-bold text-sm backdrop-blur-lg border border-white/20 ${
                          index % 3 === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                          index % 3 === 1 ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                          'bg-gradient-to-br from-purple-500 to-purple-600'
                        }`}>
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="space-y-1">
                          <time className="text-sm text-gray-600 font-medium block">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                          {post.readingTime && (
                            <div className="text-xs text-gray-500">
                              {post.readingTime.en}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tag}
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-lg border border-white/20 ${
                                tagIndex % 4 === 0 ? 'bg-blue-500/20 text-blue-700' :
                                tagIndex % 4 === 1 ? 'bg-purple-500/20 text-purple-700' :
                                tagIndex % 4 === 2 ? 'bg-emerald-500/20 text-emerald-700' :
                                'bg-pink-500/20 text-pink-700'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium liquid-glass text-gray-700 backdrop-blur-lg border border-white/20">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <Link href={`/posts/${post.slug}`} className="block">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                    </Link>
                    
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 