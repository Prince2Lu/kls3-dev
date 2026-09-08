import { createElement } from 'react'
import * as ReactPDF from '@react-pdf/renderer'
import { WeeklyReportDocument } from '@/components/demo/reporting/WeeklyReportDocument'

const DOWNLOAD_FILENAME = 'rapport-hebdomadaire-kls3-demo.pdf'

function getPdfRenderer() {
  const fromNamespace = ReactPDF.pdf
  const fromDefault = (
    ReactPDF as { default?: { pdf?: typeof ReactPDF.pdf } }
  ).default?.pdf
  const pdf = fromNamespace ?? fromDefault

  if (typeof pdf !== 'function') {
    throw new Error('Génération PDF indisponible')
  }

  return pdf
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  link.remove()

  window.setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 2000)
}

export async function generateWeeklyReportPdf(verticalId = 'finance'): Promise<void> {
  const pdf = getPdfRenderer()
  const document = createElement(WeeklyReportDocument, { verticalId })
  const blob = await pdf(
    document as unknown as Parameters<typeof pdf>[0],
  ).toBlob()

  if (!(blob instanceof Blob) || blob.size === 0) {
    throw new Error('PDF vide')
  }

  downloadBlob(blob, DOWNLOAD_FILENAME)
}
