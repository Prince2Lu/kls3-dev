import type { Metadata } from 'next'

export const SITE_URL = 'https://www.kls3-dev.com'
export const SITE_NAME = 'KLS3'

function socialTitle(title: string): string {
  return /KLS3/.test(title) ? title : `${title} | ${SITE_NAME}`
}

export function pageMetadata(
  title: string,
  description: string,
  options?: {
    path?: string
    type?: 'website' | 'article'
    publishedTime?: string
  }
): Metadata {
  const ogTitle = socialTitle(title)

  return {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description,
      type: options?.type ?? 'website',
      locale: 'fr_FR',
      siteName: SITE_NAME,
      ...(options?.path ? { url: `${SITE_URL}${options.path}` } : {}),
      ...(options?.publishedTime ? { publishedTime: options.publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
    },
  }
}

export function demoMetadata(title: string, path: string): Metadata {
  return {
    ...pageMetadata(
      title,
      "Démonstration interactive KLS3 — aperçu d'un système opérationnel.",
      { path }
    ),
    robots: { index: false, follow: false },
  }
}
