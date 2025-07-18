'use client'

import { useState, useEffect, useCallback } from 'react'
import { getTranslation, TranslationKey } from '@/lib/translations'

export function useTranslation() {
  const [locale, setLocale] = useState('en')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') || 'en'
      setLocale(savedLocale)
      setIsHydrated(true)

      const handleLocaleChange = (event: CustomEvent) => {
        setLocale(event.detail)
      }

      window.addEventListener('localeChange', handleLocaleChange as EventListener)
      
      return () => {
        window.removeEventListener('localeChange', handleLocaleChange as EventListener)
      }
    }
  }, [])

  const t = useCallback((key: TranslationKey) => {
    // 始终返回翻译内容，对于静态导出使用默认语言
    return getTranslation(locale, key)
  }, [locale])

  return { t, locale, isHydrated }
} 