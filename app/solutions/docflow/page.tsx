import type { Metadata } from 'next'
import SolutionPage from '@/components/solutions/SolutionPage'
import { docflowPage } from '@/lib/data/solutions'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(docflowPage.meta.title, docflowPage.meta.description, {
  path: '/solutions/docflow',
  absolute: true,
})

export default function DocFlowPage() {
  return <SolutionPage content={docflowPage} />
}
