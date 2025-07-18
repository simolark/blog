'use client'

export default function Footer() {
  return (
    <footer className="mt-20 mx-4 mb-6">
      <div className="liquid-glass rounded-3xl backdrop-blur-lg border border-white/20 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl blur animate-pulse"></div>
              </div>
              
              {/* 版权文本区域 */}
              <div className="relative overflow-hidden">
                <span className="text-gray-700 font-medium transition-all duration-300 inline-block">
                  © {new Date().getFullYear()} Yi He. All rights reserved.
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="mailto:yihe@wayne.edu" 
                className="group relative px-4 py-2 rounded-2xl font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <span className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300">
                  Email
                </span>
              </a>
              
              <a 
                href="https://github.com/simolark" 
                className="group relative px-4 py-2 rounded-2xl font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <span className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300">
                  GitHub
                </span>
              </a>
              
              <a 
                href="https://scholar.google.com/citations?user=qNxjAXAAAAAJ" 
                className="group relative px-4 py-2 rounded-2xl font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <span className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300">
                  Scholar
                </span>
              </a>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-4 h-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-sm animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-sm animate-pulse delay-75"></div>
        </div>
      </div>
    </footer>
  )
} 