import JsonLd from '@/components/seo/JsonLd'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export default function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'fr-FR',
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
      }}
    />
  )
}
