import type { Metadata } from 'next'
import HomeV2 from '@/components/sections/HomeV2'
import { pageMetadata } from '@/lib/seo'

const title = 'KLS3 — Automatisation, IA et applications métier pour PME'
const description = 'KLS3 simplifie vos opérations : gestion documentaire DocFlow, automatisation et agents IA, applications sur mesure. Découvrez nos solutions et testez un parcours de démonstration.'

export const metadata: Metadata = {
  ...pageMetadata(title, description, { path: '/' }),
  title: { absolute: title },
}

export default function Home() {
  return <HomeV2 />
}
