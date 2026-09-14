import JsonLd from '@/components/seo/JsonLd'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

type PersonSchemaProps = {
  name: string
  jobTitle: string
  knowsAbout?: string[]
}

export default function PersonSchema({ name, jobTitle, knowsAbout }: PersonSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        name,
        jobTitle,
        worksFor: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
        url: `${SITE_URL}/a-propos`,
        ...(knowsAbout ? { knowsAbout } : {}),
      }}
    />
  )
}
