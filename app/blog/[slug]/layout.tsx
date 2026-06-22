import type { Metadata } from 'next'
import { getPostBySlug } from '@/lib/mdx'

interface BlogLayoutProps {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: BlogLayoutProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Article non trouvé',
    }
  }

  return {
    title: post.titre_seo,
    description: post.meta_description,
    openGraph: {
      title: post.titre_seo,
      description: post.meta_description,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
