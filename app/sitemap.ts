import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BASE_URL = 'https://www.kls3-dev.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogDir = path.join(process.cwd(), 'content/blog')
  const files = fs.existsSync(blogDir)
    ? fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'))
    : []

  const articleUrls = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const filePath = path.join(blogDir, file)
      const { data } = matter(fs.readFileSync(filePath, 'utf8'))

      if ((data.status || 'draft') !== 'published') return null

      const dateStr = data.publishedAt || data.date
      const lastModified = dateStr ? new Date(dateStr) : new Date()

      return {
        url: `${BASE_URL}/blog/${slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/cas-clients`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/diagnostic`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...articleUrls,
  ]
}
