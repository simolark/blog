'use client'

import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import LanguageToggle from './LanguageToggle'

export default function Header() {
  const { t, isHydrated } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 mx-4 mt-4">
      <div className="liquid-glass rounded-full backdrop-blur-lg border border-white/20 shadow-lg shadow-blue-500/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-white font-bold text-sm">YH</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur group-hover:blur-md transition-all duration-300 -z-10"></div>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                {isHydrated ? t('header.title') : 'Yi He Blog'}
              </span>
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="/" 
                className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium group py-2"
              >
                <span className="relative z-10">{isHydrated ? t('header.home') : 'Home'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </a>
              <a 
                href="https://simolark.com" 
                className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium group py-2"
              >
                <span className="relative z-10">{isHydrated ? t('header.about') : 'About Me'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </a>
              
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
              
              <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 backdrop-blur-lg border border-emerald-200/20 rounded-full px-4 py-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-sm text-emerald-700 font-medium">
                  {isHydrated ? t('header.status') : 'Online'}
                </span>
              </div>
              
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
              
              <LanguageToggle />
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <LanguageToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-2 rounded-2xl text-gray-700 hover:text-blue-600 transition-all duration-300 group overflow-hidden"
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
              <div className="px-4 py-6 space-y-4 border-t border-white/10 mt-2">
                <a 
                  href="/" 
                  className="block relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-3 px-4 rounded-2xl group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="relative z-10">{isHydrated ? t('header.home') : 'Home'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl"></div>
                </a>
                <a 
                  href="https://simolark.com" 
                  className="block relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-3 px-4 rounded-2xl group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="relative z-10">{isHydrated ? t('header.about') : 'About Me'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl"></div>
                </a>
                <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 backdrop-blur-lg border border-emerald-200/20 rounded-2xl px-4 py-3 w-fit">
                  <div className="relative">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-sm text-emerald-700 font-medium">
                    {isHydrated ? t('header.status') : 'Online'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 