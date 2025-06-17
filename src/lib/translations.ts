export const translations = {
  zh: {
    // Header
    'header.title': "Yi He's Blog",
    'header.home': '首页',
    'header.about': '关于我',
    'header.status': '在线',
    
    // Home page
    'home.badge': '博士生 & 研究生助理',
    'home.title': '技术博客',
    'home.description': '在这里分享我的研究心得、技术见解和对机器学习前沿的思考',
    'home.latest': '最新文章',
    'home.readMore': '阅读全文',
    'home.noArticles.title': '暂时还没有文章',
    'home.noArticles.description': '第一篇博客文章正在路上...',
    
    // Post page
    'post.backHome': '返回首页',
    'post.like.title': '喜欢这篇文章吗？',
    'post.like.description': '欢迎分享你的想法，或者查看更多相关内容。',
    'post.moreArticles': '更多文章',
    'post.aboutAuthor': '了解作者',
    
    // Footer
    'footer.rights': '保留所有权利',
  },
  en: {
    // Header
    'header.title': "Yi He's Blog",
    'header.home': 'Home',
    'header.about': 'About Me',
    'header.status': 'Online',
    
    // Home page
    'home.badge': 'PhD Student & Graduate Research Assistant',
    'home.title': 'Tech Blog',
    'home.description': 'Sharing my research insights, technical thoughts, and explorations in machine learning frontiers',
    'home.latest': 'Latest Posts',
    'home.readMore': 'Read More',
    'home.noArticles.title': 'No Articles Yet',
    'home.noArticles.description': 'The first blog post is coming soon...',
    
    // Post page
    'post.backHome': 'Back to Home',
    'post.like.title': 'Like this article?',
    'post.like.description': 'Feel free to share your thoughts or explore more related content.',
    'post.moreArticles': 'More Articles',
    'post.aboutAuthor': 'About Author',
    
    // Footer
    'footer.rights': 'All rights reserved',
  }
}

export type TranslationKey = keyof typeof translations.zh

export function getTranslation(locale: string, key: TranslationKey): string {
  const lang = locale as keyof typeof translations
  return translations[lang]?.[key] || translations.en[key]
} 