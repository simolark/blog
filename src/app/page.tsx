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
    console.log('Attempting to fetch posts...')
    const posts = await getAllPosts()
    console.log('Posts fetched successfully:', posts.length)
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : error)
    return []
  }
}

// 移除动态渲染配置以支持静态导出
// export const dynamic = 'force-dynamic'
// export const revalidate = 0

export default async function Home() {
  const posts = await getPosts()

  return <HomeContent posts={posts} />
}
