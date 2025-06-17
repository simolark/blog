import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'
import { calculateReadingTime } from '@/lib/readingTime'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const posts = await getAllPosts()
    
    // Add reading time to each post
    const postsWithReadingTime = posts.map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      tags: post.tags,
      readingTime: calculateReadingTime(post.content)
    }))
    
    return NextResponse.json(postsWithReadingTime)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
} 