import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { pageMetadata } from '@/lib/seo'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = pageMetadata(
  'Blog opérationnel',
  'Ressources pratiques sur les frictions opérationnelles, le pilotage et la fluidité organisationnelle. Articles pour les entreprises de 10 à 1000 personnes.',
  { path: '/blog' }
)

export default function BlogPage() {
  const posts = getAllPosts()

  return <BlogPageClient posts={posts} />
}
