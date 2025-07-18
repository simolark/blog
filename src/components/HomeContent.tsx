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
                    
                    {/* Article Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                      <div className="flex-1">
                        <Link href={`/posts/${post.slug}`} className="block">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                            {post.title}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <time dateTime={post.date} className="flex items-center">
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                            </svg>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                          
                          {post.readingTime && (
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {post.readingTime.en}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 sm:justify-end">
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
                    
                    {/* Article Excerpt */}
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed line-clamp-3">
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