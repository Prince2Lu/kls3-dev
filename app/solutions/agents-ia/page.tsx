import type { Metadata } from 'next'
import SolutionPage from '@/components/solutions/SolutionPage'
import { agentsIaPage } from '@/lib/data/solutions'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(agentsIaPage.meta.title, agentsIaPage.meta.description, {
  path: '/solutions/agents-ia',
  absolute: true,
})

export default function AgentsIaPage() {
  return <SolutionPage content={agentsIaPage} />
}
