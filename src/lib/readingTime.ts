export function calculateReadingTime(content: string, locale: string = 'en'): string {
  // 移除HTML标签
  const cleanText = content.replace(/<[^>]*>/g, '')
  
  // 根据语言设置不同的阅读速度
  const wordsPerMinute = locale === 'zh' ? 300 : 200 // 中文300字/分钟，英文200词/分钟
  
  let wordCount: number
  
  if (locale === 'zh') {
    // 中文字符计数（包括中文标点）
    wordCount = cleanText.replace(/\s/g, '').length
  } else {
    // 英文单词计数
    wordCount = cleanText.trim().split(/\s+/).filter(word => word.length > 0).length
  }
  
  // 计算阅读时间（分钟）
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute)
  
  // 格式化输出
  if (locale === 'zh') {
    if (readingTimeMinutes === 1) {
      return '约 1 分钟阅读'
    }
    return `约 ${readingTimeMinutes} 分钟阅读`
  } else {
    if (readingTimeMinutes === 1) {
      return 'About 1 min read'
    }
    return `About ${readingTimeMinutes} min read`
  }
}

export function getWordCount(content: string, locale: string = 'en'): number {
  const cleanText = content.replace(/<[^>]*>/g, '')
  
  if (locale === 'zh') {
    return cleanText.replace(/\s/g, '').length
  } else {
    return cleanText.trim().split(/\s+/).filter(word => word.length > 0).length
  }
} 