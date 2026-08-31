import { pdf } from '@react-pdf/renderer'
import { WeeklyReportDocument } from '@/components/demo/reporting/WeeklyReportDocument'

const DOWNLOAD_FILENAME = 'rapport-hebdomadaire-kls3-demo.pdf'

export async function generateWeeklyReportPdf(): Promise<void> {
  const blob = await pdf(WeeklyReportDocument()).toBlob()
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = DOWNLOAD_FILENAME
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  link.remove()

  window.setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1500)
}
