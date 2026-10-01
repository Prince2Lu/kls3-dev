import type { Metadata } from 'next'
import DigitalCardClient from './digital-card-client'

export const metadata: Metadata = {
  title: 'Carte de visite | KLS3',
  robots: { index: false, follow: false },
}

export default async function DigitalCardPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <DigitalCardClient slug={slug} />
}
