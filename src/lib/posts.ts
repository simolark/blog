import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'
import remarkParse from 'remark-parse'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags?: string[]
}

async function processMarkdownContent(content: string): Promise<string> {
  try {
    // 使用unified处理markdown，支持HTML和数学公式
    const result = await unified()
      .use(remarkParse)
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeKatex)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content)
    
    return String(result)
  } catch (error) {
    console.error('Advanced markdown processing failed, using manual processing:', error)
    
    // 备用：手动处理基本的 markdown 语法
    let processedContent = content
    
    // 处理标题
    processedContent = processedContent
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
      .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
    
    // 处理粗体和斜体
    processedContent = processedContent
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    
    // 处理代码块
    processedContent = processedContent
      .replace(/```([^`]*)```/gim, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
    
    // 处理链接
    processedContent = processedContent
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    
    // 处理换行为段落
    const paragraphs = processedContent.split(/\n\s*\n/)
    processedContent = paragraphs.map(p => {
      const trimmed = p.trim()
      if (!trimmed) return ''
      // 如果已经是HTML标签，就不包装p标签
      if (trimmed.startsWith('<') && (trimmed.includes('<h') || trimmed.includes('<pre') || trimmed.includes('<ul') || trimmed.includes('<ol'))) {
        return trimmed
      }
      return `<p>${trimmed}</p>`
    }).join('\n')
    
    return processedContent
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    // 检查目录是否存在
    if (!fs.existsSync(postsDirectory)) {
      console.error('Posts directory does not exist:', postsDirectory)
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    console.log('Found files:', fileNames)
    
    // 只处理 .md 文件
    const markdownFiles = fileNames.filter(fileName => fileName.endsWith('.md'))
    console.log('Markdown files:', markdownFiles)
    
    if (markdownFiles.length === 0) {
      console.log('No markdown files found')
      return []
    }

    const allPostsData = await Promise.all(
      markdownFiles.map(async (fileName) => {
        try {
          const slug = fileName.replace(/\.md$/, '')
          const fullPath = path.join(postsDirectory, fileName)
          console.log('Reading file:', fullPath)
          
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          const { data, content } = matter(fileContents)
          
          // 使用改进的markdown处理
          const contentHtml = await processMarkdownContent(content)

          return {
            slug,
            title: data.title || slug,
            date: data.date || '2023-01-01',
            excerpt: data.excerpt || '',
            content: contentHtml,
            tags: data.tags || [],
          }
        } catch (error) {
          console.error(`Error processing file ${fileName}:`, error)
          // 使用手动HTML处理作为备用
          try {
            const slug = fileName.replace(/\.md$/, '')
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContents)
            
            // 简单处理，保留HTML标签不变
            let processedContent = content
            
            // 处理markdown语法，但保留HTML标签
            processedContent = processedContent
              .replace(/^# (.*$)/gim, '<h1>$1</h1>')
              .replace(/^## (.*$)/gim, '<h2>$1</h2>')
              .replace(/^### (.*$)/gim, '<h3>$1</h3>')
              .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/gim, '<em>$1</em>')
            
            // 处理段落，但不影响已存在的HTML标签
            const paragraphs = processedContent.split(/\n\s*\n/)
            processedContent = paragraphs.map(p => {
              const trimmed = p.trim()
              if (!trimmed) return ''
              // 如果已经是HTML标签，就不包装p标签
              if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
                return trimmed
              }
              return `<p>${trimmed}</p>`
            }).join('\n')
            
            return {
              slug,
              title: data.title || slug,
              date: data.date || '2023-01-01',
              excerpt: data.excerpt || '',
              content: processedContent,
              tags: data.tags || [],
            }
          } catch (fallbackError) {
            console.error(`Fallback processing also failed for ${fileName}:`, fallbackError)
            return null
          }
        }
      })
    )

    // 过滤掉失败的文件
    const validPosts = allPostsData.filter(post => post !== null) as Post[]
    console.log('Valid posts:', validPosts.length)
    
    return validPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error in getAllPosts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    console.log('Looking for post at:', fullPath)
    
    if (!fs.existsSync(fullPath)) {
      console.error('Post file does not exist:', fullPath)
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    try {
      // 使用改进的markdown处理
      const contentHtml = await processMarkdownContent(content)

      return {
        slug,
        title: data.title || slug,
        date: data.date || '2023-01-01',
        excerpt: data.excerpt || '',
        content: contentHtml,
        tags: data.tags || [],
      }
    } catch (processingError) {
      console.error('Markdown processing failed, using manual fallback:', processingError)
      
      // 手动处理作为备用，保留HTML标签
      let processedContent = content
      
      // 处理markdown语法，但保留HTML标签
      processedContent = processedContent
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      
      // 处理段落，但不影响已存在的HTML标签
      const paragraphs = processedContent.split(/\n\s*\n/)
      processedContent = paragraphs.map(p => {
        const trimmed = p.trim()
        if (!trimmed) return ''
        // 如果已经是HTML标签，就不包装p标签
        if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
          return trimmed
        }
        return `<p>${trimmed}</p>`
      }).join('\n')
      
      return {
        slug,
        title: data.title || slug,
        date: data.date || '2023-01-01',
        excerpt: data.excerpt || '',
        content: processedContent,
        tags: data.tags || [],
      }
    }
  } catch (error) {
    console.error(`Error in getPostBySlug for ${slug}:`, error)
    return null
  }
} 