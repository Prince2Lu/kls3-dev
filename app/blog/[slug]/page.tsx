import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import JsonLd from '@/components/seo/JsonLd'
import BlogPost from './BlogPost'

const BASE_URL = 'https://www.kls3-dev.com'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
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

  const publishedIso = post.publishedAt
    ? new Date(post.publishedAt).toISOString()
    : new Date().toISOString()
  const imageUrl = post.image
    ? `${BASE_URL}${post.image.startsWith('/') ? post.image : `/${post.image}`}`
    : `${BASE_URL}/favicon.svg`

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.titre_seo,
          description: post.meta_description ?? '',
          url: `${BASE_URL}/blog/${post.slug}`,
          datePublished: publishedIso,
          dateModified: publishedIso,
          author: {
            '@type': 'Organization',
            name: 'KLS3',
            url: BASE_URL,
          },
          publisher: {
            '@type': 'Organization',
            name: 'KLS3',
            url: BASE_URL,
            logo: {
              '@type': 'ImageObject',
              url: `${BASE_URL}/favicon.svg`,
            },
          },
          image: imageUrl,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${BASE_URL}/blog/${post.slug}`,
          },
        }}
      />
      <BlogPost post={post} />
    </>
  )
}
