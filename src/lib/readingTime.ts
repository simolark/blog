export function calculateReadingTime(content: string): string {
  // 移除HTML标签
  const cleanText = content.replace(/<[^>]*>/g, '')
  
  // 英文阅读速度：200词/分钟
  const wordsPerMinute = 200
  
  // 英文单词计数
  const wordCount = cleanText.trim().split(/\s+/).filter(word => word.length > 0).length
  
  // 计算阅读时间（分钟）
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute)
  
  // 格式化输出
  if (readingTimeMinutes === 1) {
    return 'About 1 min read'
  }
  return `About ${readingTimeMinutes} min read`
}

export function getWordCount(content: string, locale: string = 'en'): number {
  const cleanText = content.replace(/<[^>]*>/g, '')
  
  if (locale === 'zh') {
    return cleanText.replace(/\s/g, '').length
  } else {
    return cleanText.trim().split(/\s+/).filter(word => word.length > 0).length
  }
} 