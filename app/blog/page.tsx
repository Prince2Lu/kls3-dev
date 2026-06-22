import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles sur l\'IA, la gestion de projet et le développement SaaS.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return <BlogPageClient posts={posts} />
}
