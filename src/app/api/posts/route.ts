import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { calculateReadingTime } from '@/lib/readingTime'

const postsDirectory = path.join(process.cwd(), 'posts')

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    // 检查posts目录是否存在
    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json([])
    }

    const fileNames = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.md'))
    
    if (fileNames.length === 0) {
      return NextResponse.json([])
    }

    const allPostsData = await Promise.all(
      fileNames.map(async (fileName) => {
        try {
          const slug = fileName.replace(/\.md$/, '')
          const fullPath = path.join(postsDirectory, fileName)
          
          // 检查文件是否仍然存在
          if (!fs.existsSync(fullPath)) {
            return null
          }
          
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          const { data, content } = matter(fileContents)
          
          const processedContent = await unified()
            .use(remarkParse)
            .use(remarkMath)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeKatex, { 
              strict: false,
              throwOnError: false,
              macros: {
                "\\RR": "\\mathbb{R}",
                "\\CC": "\\mathbb{C}",
                "\\ZZ": "\\mathbb{Z}",
                "\\QQ": "\\mathbb{Q}",
                "\\NN": "\\mathbb{N}"
              }
            })
            .use(rehypeStringify, { allowDangerousHtml: true })
            .process(content)
            
          const contentHtml = processedContent.toString()
          
          // 计算阅读时间（英文和中文）
          const readingTimeEn = calculateReadingTime(content, 'en')
          const readingTimeZh = calculateReadingTime(content, 'zh')

          return {
            slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString().split('T')[0],
            excerpt: data.excerpt || '',
            content: contentHtml,
            tags: data.tags || [],
            readingTime: {
              en: readingTimeEn,
              zh: readingTimeZh
            }
          }
        } catch (fileError) {
          console.warn(`Error processing file ${fileName}:`, fileError)
          return null
        }
      })
    )

    // 过滤掉null值（处理失败的文件）
    const validPosts = allPostsData.filter(post => post !== null)
    const sortedPosts = validPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
    
    return NextResponse.json(sortedPosts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
} 