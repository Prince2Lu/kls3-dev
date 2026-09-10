import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, toListingPost } from '@/lib/mdx'
import { pageMetadata } from '@/lib/seo'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = pageMetadata(
  'Blog opérationnel',
  'Ressources pratiques sur les frictions opérationnelles, le pilotage et la fluidité organisationnelle. Articles pour les entreprises de 10 à 1000 personnes.',
  { path: '/blog' }
)

export default function BlogPage() {
  const posts = getAllPosts()
  const listings = posts.map(toListingPost)

  return (
    <>
      <nav className="sr-only" aria-label="Tous les articles">
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.titre_seo}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <BlogPageClient posts={listings} />
    </>
  )
}
