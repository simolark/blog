import HomeContent from '@/components/HomeContent'
import { getAllPosts } from '@/lib/posts'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  tags?: string[]
  readingTime?: {
    en: string
    zh: string
  }
}

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await getAllPosts()
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const posts = await getPosts()

  return <HomeContent posts={posts} />
}
