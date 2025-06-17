'use client'

import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'

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
  const { t, locale, isHydrated } = useTranslation()

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

  // 在水合完成前显示加载状态
  if (!isHydrated) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="animate-pulse">
          <div className="text-center mb-12 sm:mb-16">
            <div className="h-6 sm:h-8 bg-gray-200 rounded mx-auto w-48 sm:w-64 mb-4 sm:mb-6"></div>
            <div className="h-12 sm:h-16 bg-gray-200 rounded mx-auto w-80 sm:w-96 mb-4 sm:mb-6"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded mx-auto w-64 sm:w-80"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Posts by Year */}
      <div className="mb-8">
        {sortedYears.map((year) => (
          <div key={year} className="mb-8 sm:mb-12">
            <div className="flex items-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mr-3 sm:mr-4">{year}</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              <div className="bg-gray-100 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-gray-600 font-medium ml-2 sm:ml-4">
                {postsByYear[year].length} {postsByYear[year].length === 1 ? (locale === 'zh' ? '篇文章' : 'article') : (locale === 'zh' ? '篇文章' : 'articles')}
              </div>
            </div>
            
            <div className="grid gap-4 sm:gap-6 lg:gap-8">
              {postsByYear[year].map((post, index) => (
                <article key={post.slug} className="group">
                  <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 active:scale-[0.98]">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3 sm:gap-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                          index % 3 === 0 ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                          index % 3 === 1 ? 'bg-gradient-to-r from-green-500 to-blue-500' :
                          'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <time className="text-xs sm:text-sm text-gray-500 block">
                            {new Date(post.date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                          {post.readingTime && (
                            <div className="text-xs text-gray-400 mt-1">
                              {locale === 'zh' ? post.readingTime.zh : post.readingTime.en}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <Link href={`/posts/${post.slug}`} className="block">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 sm:mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      href={`/posts/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group text-sm sm:text-base"
                    >
                      <span className="whitespace-nowrap">{t('home.readMore')}</span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-16 sm:py-20">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{t('home.noArticles.title')}</h3>
          <p className="text-sm sm:text-base text-gray-500">{t('home.noArticles.description')}</p>
        </div>
      )}
    </div>
  )
} 