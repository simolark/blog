import { NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/posts'
import { calculateReadingTime } from '@/lib/readingTime'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getPostBySlug(params.slug)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Add reading time
    const postWithReadingTime = {
      ...post,
      readingTime: calculateReadingTime(post.content)
    }
    
    return NextResponse.json(postWithReadingTime)
  } catch (error) {
    console.error(`Error fetching post ${params.slug}:`, error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
} 