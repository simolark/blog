'use client'

import { useTranslation } from '@/hooks/useTranslation'

export default function Footer() {
  const { t, isHydrated } = useTranslation()

  return (
    <footer className="mt-20 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md"></div>
            <span className="text-gray-600">
              © {new Date().getFullYear()} Yi He. {isHydrated ? t('footer.rights') : 'All rights reserved'}.
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="mailto:yihe@wayne.edu" className="text-gray-500 hover:text-gray-700 transition-colors">
              Email
            </a>
            <a href="https://github.com/simolark" className="text-gray-500 hover:text-gray-700 transition-colors">
              GitHub
            </a>
            <a href="https://scholar.google.com/citations?user=qNxjAXAAAAAJ" className="text-gray-500 hover:text-gray-700 transition-colors">
              Scholar
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 