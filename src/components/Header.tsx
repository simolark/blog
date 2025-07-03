'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import LanguageToggle from './LanguageToggle'

export default function Header() {
  const { t, isHydrated, locale } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // 翻译文本状态，用于平滑过渡
  const [displayTexts, setDisplayTexts] = useState({
    title: 'Yi He Blog',
    home: 'Home',
    about: 'About Me',
    status: 'Online'
  })
  const [isTransitioning, setIsTransitioning] = useState(false)

  // 处理语言切换的平滑过渡
  useEffect(() => {
    if (!isHydrated) return

    const newTexts = {
      title: t('header.title'),
      home: t('header.home'),
      about: t('header.about'),
      status: t('header.status')
    }

    // 检查是否有文本需要更新
    const hasChanges = Object.keys(newTexts).some(key => 
      newTexts[key as keyof typeof newTexts] !== displayTexts[key as keyof typeof displayTexts]
    )

    if (hasChanges) {
      setIsTransitioning(true)
      
      // 淡出当前文本
      setTimeout(() => {
        setDisplayTexts(newTexts)
        // 淡入新文本
        setTimeout(() => {
          setIsTransitioning(false)
        }, 200)
      }, 200)
    }
  }, [t, isHydrated, locale])

  return (
    <header className="sticky top-0 z-50 mx-4 mt-4">
      <div className={`liquid-glass backdrop-blur-lg border border-white/20 shadow-lg shadow-blue-500/5 transition-all duration-300 ${
        isMobileMenuOpen ? 'rounded-3xl' : 'rounded-full'
      }`}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-white font-bold text-sm">YH</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur group-hover:blur-md transition-all duration-300 -z-10"></div>
              </div>
              <div className="relative overflow-hidden">
                <span className={`font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300 inline-block ${
                  isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
                }`}>
                  {displayTexts.title}
                </span>
              </div>
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="/" 
                className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium group py-2"
              >
                <div className="relative overflow-hidden">
                  <span className={`relative z-10 transition-all duration-300 inline-block ${
                    isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
                  }`}>
                    {displayTexts.home}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </a>
              <a 
                href="https://simolark.com" 
                className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium group py-2"
              >
                <div className="relative overflow-hidden">
                  <span className={`relative z-10 transition-all duration-300 inline-block ${
                    isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
                  }`}>
                    {displayTexts.about}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </a>
              
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
              
              <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 backdrop-blur-lg border border-emerald-200/20 rounded-full px-4 py-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                </div>
                <div className="relative overflow-hidden">
                  <span className={`text-sm text-emerald-700 font-medium transition-all duration-300 inline-block ${
                    isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
                  }`}>
                    {displayTexts.status}
                  </span>
                </div>
              </div>
              
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
              
              <LanguageToggle />
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <LanguageToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-2.5 rounded-lg text-gray-700 hover:text-blue-600 transition-all duration-200 group overflow-hidden hover:bg-blue-500/5 active:bg-blue-500/10 active:scale-95"
                aria-label="Toggle mobile menu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <svg className="w-5 h-5 relative z-10 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-6 py-5 border-t border-white/20 mt-2">
                <div className="space-y-1">
                  <a 
                    href="/" 
                    className="block relative group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-200 transform group-active:scale-[0.98]"></div>
                    <div className="relative px-4 py-3.5 flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-70 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <div className="relative overflow-hidden">
                        <span className={`font-medium text-gray-800 group-hover:text-blue-600 transition-all duration-200 inline-block ${
                          isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
                        }`}>
                          {displayTexts.home}
                        </span>
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://simolark.com" 
                    className="block relative group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-200 transform group-active:scale-[0.98]"></div>
                    <div className="relative px-4 py-3.5 flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-70 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <div className="relative overflow-hidden">
                        <span className={`font-medium text-gray-800 group-hover:text-purple-600 transition-all duration-200 inline-block ${
                          isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
                        }`}>
                          {displayTexts.about}
                        </span>
                      </div>
                    </div>
                  </a>
                  
                  {/* 状态区域 */}
                  <div className="pt-3 pb-1">
                    <div className="flex items-center space-x-3 bg-emerald-50/80 border border-emerald-200/40 rounded-xl px-4 py-3">
                      <div className="relative">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-1.5 h-1.5 bg-emerald-500/40 rounded-full animate-ping"></div>
                      </div>
                      <div className="relative overflow-hidden">
                        <span className={`text-sm text-emerald-700 font-medium transition-all duration-300 inline-block ${
                          isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
                        }`}>
                          {displayTexts.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 