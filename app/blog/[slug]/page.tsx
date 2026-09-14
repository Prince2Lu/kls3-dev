import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { pageMetadata } from '@/lib/seo'
import BlogPostingSchema from '@/components/seo/BlogPostingSchema'
import BlogPost from './BlogPost'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return pageMetadata('Article non trouvé', 'Cet article est introuvable.')
  }

  return pageMetadata(post.titre_seo, post.meta_description, {
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    absolute: true,
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <BlogPostingSchema
        title={post.titre_seo}
        description={post.meta_description}
        slug={post.slug}
        publishedAt={post.publishedAt}
        image={post.image}
      />
      <BlogPost post={post} />
    </>
  )
}
