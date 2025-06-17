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

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags?: string[]
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
          
          // 使用remark处理markdown
          const processedContent = await remark()
            .use(remarkHtml)
            .process(content)
          
          const contentHtml = processedContent.toString()

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
          // 使用简单的HTML转换作为备用
          try {
            const slug = fileName.replace(/\.md$/, '')
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContents)
            
            // 简单的markdown转换
            const simpleHtml = content
              .replace(/^# (.*$)/gim, '<h1>$1</h1>')
              .replace(/^## (.*$)/gim, '<h2>$1</h2>')
              .replace(/^### (.*$)/gim, '<h3>$1</h3>')
              .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
              .replace(/\*(.*)\*/gim, '<em>$1</em>')
              .replace(/\n\n/gim, '</p><p>')
              .replace(/^(?!<[h|p|u|o])/gim, '<p>')
              .replace(/$/gim, '</p>')
            
            return {
              slug,
              title: data.title || slug,
              date: data.date || '2023-01-01',
              excerpt: data.excerpt || '',
              content: simpleHtml,
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
      // 使用remark处理markdown
      const processedContent = await remark()
        .use(remarkHtml)
        .process(content)
      
      const contentHtml = processedContent.toString()

      return {
        slug,
        title: data.title || slug,
        date: data.date || '2023-01-01',
        excerpt: data.excerpt || '',
        content: contentHtml,
        tags: data.tags || [],
      }
    } catch (processingError) {
      console.error('Markdown processing failed, using fallback:', processingError)
      
      // 简单的markdown转换作为备用
      const simpleHtml = content
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\n\n/gim, '</p><p>')
        .replace(/^(?!<[h|p|u|o])/gim, '<p>')
        .replace(/$/gim, '</p>')
      
      return {
        slug,
        title: data.title || slug,
        date: data.date || '2023-01-01',
        excerpt: data.excerpt || '',
        content: simpleHtml,
        tags: data.tags || [],
      }
    }
  } catch (error) {
    console.error(`Error in getPostBySlug for ${slug}:`, error)
    return null
  }
} 