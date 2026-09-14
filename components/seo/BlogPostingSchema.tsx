import JsonLd from '@/components/seo/JsonLd'
import { kls3CompanyInfo } from '@/lib/data/company-info'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

type BlogPostingSchemaProps = {
  title: string
  description: string
  slug: string
  publishedAt: string
  image?: string
}

export default function BlogPostingSchema({
  title,
  description,
  slug,
  publishedAt,
  image,
}: BlogPostingSchemaProps) {
  const url = `${SITE_URL}/blog/${slug}`
  const imageUrl = image
    ? `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`
    : kls3CompanyInfo.logoUrl
  const publishedIso = Number.isNaN(Date.parse(publishedAt))
    ? publishedAt
    : new Date(publishedAt).toISOString()

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        url,
        datePublished: publishedIso,
        dateModified: publishedIso,
        image: imageUrl,
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: kls3CompanyInfo.logoUrl,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      }}
    />
  )
}
