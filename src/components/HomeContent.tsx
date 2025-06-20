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
        <div className="animate-pulse space-y-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="h-6 sm:h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto w-48 sm:w-64 mb-4 sm:mb-6"></div>
            <div className="h-12 sm:h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto w-80 sm:w-96 mb-4 sm:mb-6"></div>
            <div className="h-4 sm:h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto w-64 sm:w-80"></div>
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="liquid-glass rounded-3xl p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/6"></div>
                </div>
              </div>
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 sm:mb-20">
        <div className="relative">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              Welcome to My Blog
            </span>
          </h1>
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-bounce delay-75"></div>
        </div>
        <p className="text-xl sm:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
          {locale === 'zh' ? '分享研究洞察、技术思考和机器学习前沿探索' : 'Sharing research insights, technical thoughts, and explorations in machine learning frontiers'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {['AI', 'Machine Learning', 'Research', 'Technology'].map((tag, index) => (
            <span
              key={tag}
              className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 ${
                index % 4 === 0 ? 'bg-blue-500/20 text-blue-700 hover:bg-blue-500/30' :
                index % 4 === 1 ? 'bg-purple-500/20 text-purple-700 hover:bg-purple-500/30' :
                index % 4 === 2 ? 'bg-emerald-500/20 text-emerald-700 hover:bg-emerald-500/30' :
                'bg-pink-500/20 text-pink-700 hover:bg-pink-500/30'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Posts by Year */}
      <div className="space-y-12 sm:space-y-16">
        {sortedYears.map((year) => (
          <div key={year} className="relative">
            <div className="flex items-center mb-8 sm:mb-10">
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {year}
                </h2>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-200 via-purple-200 to-transparent ml-6"></div>
              <div className="liquid-glass px-4 py-2 rounded-full text-sm text-gray-700 font-medium backdrop-blur-lg border border-white/20">
                {postsByYear[year].length} {postsByYear[year].length === 1 ? (locale === 'zh' ? '篇文章' : 'article') : (locale === 'zh' ? '篇文章' : 'articles')}
              </div>
            </div>
            
            <div className="grid gap-6 sm:gap-8">
              {postsByYear[year].map((post, index) => (
                <article key={post.slug} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl transform scale-95 group-hover:scale-100 transition-transform duration-500 blur-sm"></div>
                  <div className="relative liquid-glass rounded-3xl p-6 sm:p-8 backdrop-blur-lg border border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 active:scale-[0.98]">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white font-bold text-sm backdrop-blur-lg border border-white/20 transition-all duration-300 hover:scale-110 ${
                          index % 3 === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                          index % 3 === 1 ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                          'bg-gradient-to-br from-purple-500 to-purple-600'
                        }`}>
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="space-y-1">
                          <time className="text-sm text-gray-600 font-medium block">
                            {new Date(post.date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                          {post.readingTime && (
                            <div className="text-xs text-gray-500 flex items-center space-x-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{locale === 'zh' ? post.readingTime.zh : post.readingTime.en}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tag}
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-lg border border-white/20 transition-all duration-300 hover:scale-105 ${
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
                    
                    <Link href={`/posts/${post.slug}`} className="block group/title">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 group-hover/title:bg-gradient-to-r group-hover/title:from-blue-600 group-hover/title:to-purple-600 group-hover/title:bg-clip-text group-hover/title:text-transparent transition-all duration-300 mb-4 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                    </Link>
                    
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      href={`/posts/${post.slug}`}
                      className="inline-flex items-center px-6 py-3 rounded-2xl font-medium group/btn text-gray-700 hover:text-white transition-all duration-300 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-purple-600 backdrop-blur-lg border border-white/20 hover:border-transparent hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 active:scale-95"
                    >
                      <span className="whitespace-nowrap">{t('home.readMore')}</span>
                      <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="text-center py-20 sm:py-24">
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 liquid-glass rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-lg border border-white/20 hover:scale-110 transition-transform duration-500">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('home.noArticles.title')}
            </span>
          </h3>
          <p className="text-lg text-gray-600 max-w-md mx-auto">{t('home.noArticles.description')}</p>
        </div>
      )}
    </div>
  )
} 