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

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const fullPath = path.join(postsDirectory, `${params.slug}.md`)
    
    // 检查文件是否存在
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
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

    return NextResponse.json({
      slug: params.slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || '',
      content: contentHtml,
      tags: data.tags || [],
      readingTime: {
        en: readingTimeEn,
        zh: readingTimeZh
      }
    })
  } catch (error) {
    console.error(`Error fetching post ${params.slug}:`, error)
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
} 