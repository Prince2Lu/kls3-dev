import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: 'Blog opérationnel',
  description:
    'Ressources pratiques sur les frictions opérationnelles, le pilotage et la fluidité organisationnelle. Articles pour les entreprises de 10 à 1000 personnes.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.kls3-dev.com/blog',
    siteName: 'KLS3',
    title: 'Blog opérationnel | KLS3',
    description:
      'Ressources pratiques sur les frictions opérationnelles, le pilotage et la fluidité organisationnelle. Articles pour les entreprises de 10 à 1000 personnes.',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return <BlogPageClient posts={posts} />
}
