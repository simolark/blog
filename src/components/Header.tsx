'use client'

import { useTranslation } from '@/hooks/useTranslation'
import LanguageToggle from './LanguageToggle'

export default function Header() {
  const { t, isHydrated } = useTranslation()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-sm">YH</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {isHydrated ? t('header.title') : 'Yi He Blog'}
            </span>
          </a>
          
          <nav className="flex items-center space-x-6">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              {isHydrated ? t('header.home') : 'Home'}
            </a>
            <a href="https://simolark.com" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              {isHydrated ? t('header.about') : 'About Me'}
            </a>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">
                {isHydrated ? t('header.status') : 'Online'}
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <LanguageToggle />
          </nav>
        </div>
      </div>
    </header>
  )
} 