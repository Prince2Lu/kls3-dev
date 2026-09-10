import type { Metadata } from 'next'
import { getPostBySlug } from '@/lib/mdx'
import { pageMetadata } from '@/lib/seo'

interface BlogLayoutProps {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: BlogLayoutProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return pageMetadata('Article non trouvé', 'Cet article est introuvable.')
  }

  return pageMetadata(post.titre_seo, post.meta_description, {
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
  })
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
