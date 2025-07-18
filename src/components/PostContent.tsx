'use client'

import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import { useEffect, useRef } from 'react'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags?: string[]
  readingTime?: {
    en: string
    zh: string
  }
}

interface PostContentProps {
  post: Post
}

export default function PostContent({ post }: PostContentProps) {
  const { t, locale, isHydrated } = useTranslation()
  const contentRef = useRef<HTMLDivElement>(null)

  // 确保数学公式在客户端正确渲染
  useEffect(() => {
    if (isHydrated && contentRef.current) {
      // 触发重新渲染，确保KaTeX正常工作
      const mathElements = contentRef.current.querySelectorAll('.katex, .katex-display')
      if (mathElements.length === 0) {
        // 如果没有找到渲染的数学公式，可能需要重新处理
        console.log('Math formulas may need re-rendering')
      }
    }
  }, [isHydrated, post.content])

  // 移除 hydration 检查，直接显示内容以支持静态导出
  // if (!isHydrated) {
  //   return skeleton screen...
  // }

  return (
    <div className="min-h-screen">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="whitespace-nowrap">{t('post.backHome')}</span>
          </Link>

          {/* Article Meta */}
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <time dateTime={post.date} className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              
              {post.readingTime && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="whitespace-nowrap">
                    {locale === 'zh' ? post.readingTime.zh : post.readingTime.en}
                  </span>
                </div>
              )}
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/80 text-gray-700 border border-gray-200/50 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Article Title */}
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
            {post.title}
          </h1>
          
          {/* Article Excerpt */}
          <p className="text-xl text-gray-600 mt-6 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-500/5">
          <article 
            ref={contentRef}
            className="prose prose-lg prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>

        {/* Article Footer */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl border border-gray-200/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('post.like.title')}</h3>
              <p className="text-gray-600">{t('post.like.description')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium whitespace-nowrap min-w-[140px]"
              >
                {t('post.moreArticles')}
              </Link>
              <a
                href="https://simolark.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap min-w-[140px]"
              >
                {t('post.aboutAuthor')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 