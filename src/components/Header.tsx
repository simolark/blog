'use client'

import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import LanguageToggle from './LanguageToggle'

export default function Header() {
  const { t, isHydrated } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-sm">YH</span>
            </div>
            <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {isHydrated ? t('header.title') : 'Yi He Blog'}
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="md:hidden border-t border-gray-200/50 bg-white/90 backdrop-blur-sm">
            <nav className="px-4 py-4 space-y-4">
              <a 
                href="/" 
                className="block text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {isHydrated ? t('header.home') : 'Home'}
              </a>
              <a 
                href="https://simolark.com" 
                className="block text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {isHydrated ? t('header.about') : 'About Me'}
              </a>
              <div className="flex items-center space-x-2 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">
                  {isHydrated ? t('header.status') : 'Online'}
                </span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 