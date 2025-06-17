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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded mx-auto w-64 mb-6"></div>
            <div className="h-16 bg-gray-200 rounded mx-auto w-96 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded mx-auto w-80"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Posts by Year */}
      <div className="mb-8">
        {sortedYears.map((year) => (
          <div key={year} className="mb-12">
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mr-4">{year}</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600 font-medium ml-4">
                {postsByYear[year].length} {postsByYear[year].length === 1 ? (locale === 'zh' ? '篇文章' : 'article') : (locale === 'zh' ? '篇文章' : 'articles')}
              </div>
            </div>
            
            <div className="grid gap-8">
              {postsByYear[year].map((post, index) => (
                <article key={post.slug} className="group">
                  <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                          index % 3 === 0 ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                          index % 3 === 1 ? 'bg-gradient-to-r from-green-500 to-blue-500' :
                          'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <time className="text-sm text-gray-500 block">
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
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <Link href={`/posts/${post.slug}`} className="block">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                        {post.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      href={`/posts/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                    >
                      <span className="whitespace-nowrap">{t('home.readMore')}</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.noArticles.title')}</h3>
          <p className="text-gray-500">{t('home.noArticles.description')}</p>
        </div>
      )}
    </div>
  )
} 