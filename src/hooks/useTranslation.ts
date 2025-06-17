'use client'

import { useState, useEffect, useCallback } from 'react'
import { getTranslation, TranslationKey } from '@/lib/translations'

export function useTranslation() {
  const [locale, setLocale] = useState('en')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
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
  }, [])

  const t = useCallback((key: TranslationKey) => {
    if (!isHydrated) {
      // 在水合完成前返回默认英文，避免闪烁
      return getTranslation('en', key)
    }
    return getTranslation(locale, key)
  }, [locale, isHydrated])

  return { t, locale, isHydrated }
} 