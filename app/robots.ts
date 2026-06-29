import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/frictions',
          '/solutions',
          '/methode',
          '/missions',
          '/agents-ia',
          '/saas',
        ],
      },
    ],
    sitemap: 'https://www.kls3-dev.com/sitemap.xml',
  }
}
