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
      className={`group relative flex items-center space-x-2 px-4 py-2 rounded-2xl backdrop-blur-lg border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden ${
        isChanging ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      
      {/* Ripple effect on click */}
      <div className={`absolute inset-0 bg-white/20 rounded-2xl transform transition-transform duration-300 ${
        isChanging ? 'scale-100' : 'scale-0'
      }`}></div>
      
      <div className="flex items-center space-x-2 relative z-10">
        <div className="relative">
          <span className={`text-sm font-medium transition-all duration-300 ${
            isChanging ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          } ${
            isChanging ? 'text-teal-600' : 'text-gray-700 group-hover:text-white'
          }`}>
            {locale === 'en' ? 'EN' : '中'}
          </span>
          
          {/* Loading indicator */}
          {isChanging && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 border border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        <svg 
          className={`w-4 h-4 transition-all duration-300 ${
            isChanging ? 'rotate-180 scale-110 text-teal-500' : 'group-hover:rotate-180 text-gray-600 group-hover:text-white'
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