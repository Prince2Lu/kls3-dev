import type { Metadata } from 'next'
import SolutionPage from '@/components/solutions/SolutionPage'
import { surMesurePage } from '@/lib/data/solutions'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(surMesurePage.meta.title, surMesurePage.meta.description, {
  path: '/solutions/sur-mesure',
  absolute: true,
})

export default function SurMesurePage() {
  return <SolutionPage content={surMesurePage} />
}
