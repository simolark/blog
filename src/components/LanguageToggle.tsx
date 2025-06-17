'use client'

import { useState, useEffect } from 'react'

export default function LanguageToggle() {
  const [locale, setLocale] = useState('en')
  const [isClient, setIsClient] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedLocale = localStorage.getItem('locale') || 'en'
    setLocale(savedLocale)
  }, [])

  const toggleLocale = async () => {
    if (isChanging) return // 防止重复点击
    
    setIsChanging(true)
    const newLocale = locale === 'en' ? 'zh' : 'en'
    
    // 添加短暂延迟以提供视觉反馈
    setTimeout(() => {
      setLocale(newLocale)
      localStorage.setItem('locale', newLocale)
      
      // 触发自定义事件来通知其他组件
      window.dispatchEvent(new CustomEvent('localeChange', { detail: newLocale }))
      
      // 重置状态
      setTimeout(() => {
        setIsChanging(false)
      }, 150)
    }, 100)
  }

  if (!isClient) {
    return null
  }

  return (
    <button
      onClick={toggleLocale}
      disabled={isChanging}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:bg-white hover:shadow-lg transition-all duration-300 group ${
        isChanging ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <div className="flex items-center space-x-1">
        <span className={`text-sm font-medium text-gray-700 transition-opacity duration-200 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
          {locale === 'en' ? 'EN' : '中'}
        </span>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-all duration-300 ${
            isChanging ? 'rotate-180 scale-110' : 'group-hover:rotate-180'
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      </div>
    </button>
  )
} 