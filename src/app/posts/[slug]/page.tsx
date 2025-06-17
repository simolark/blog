import { notFound } from 'next/navigation'
import PostContent from '@/components/PostContent'
import { getPostBySlug } from '@/lib/posts'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags?: string[]
  readingTime?: {
    en: string
    zh: string
  }
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await getPostBySlug(slug)
    return post
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error)
    return null
  }
}

interface Props {
  params: {
    slug: string
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return <PostContent post={post} />
} 