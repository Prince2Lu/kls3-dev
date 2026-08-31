'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import DemoButton from '@/components/demo/shared/DemoButton'
import { generateWeeklyReportPdf } from '@/lib/pdf/generateWeeklyReportPdf'

interface ReportPreviewCardProps {
  title: string
  weekLabel: string
  bullets: string[]
  downloadLabel: string
  downloadHint: string
}

const DOWNLOAD_ERROR = 'Une erreur est survenue, réessayez.'

export default function ReportPreviewCard({
  title,
  weekLabel,
  bullets,
  downloadLabel,
}: ReportPreviewCardProps) {
  const [entered, setEntered] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  useEffect(() => {
    let innerFrame = 0
    const outerFrame = window.requestAnimationFrame(() => {
      innerFrame = window.requestAnimationFrame(() => setEntered(true))
    })
    return () => {
      window.cancelAnimationFrame(outerFrame)
      window.cancelAnimationFrame(innerFrame)
    }
  }, [])

  const handleDownload = async () => {
    if (isGeneratingPdf) return
    setDownloadError(null)
    setIsGeneratingPdf(true)
    try {
      await generateWeeklyReportPdf()
    } catch (error) {
      console.error(error)
      setDownloadError(DOWNLOAD_ERROR)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  return (
    <article
      className="rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8"
      style={{
        borderWidth: 0.5,
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 450ms ease-out, transform 450ms ease-out',
      }}
    >
      <header>
        <h2 className="font-display text-[15px] font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-xs font-light text-foreground-muted">{weekLabel}</p>
      </header>

      <ul className="mt-5 flex flex-col gap-3">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-2.5 font-light leading-relaxed text-foreground"
            style={{ fontSize: 13 }}
          >
            <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-accent" aria-hidden />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <DemoButton
        type="button"
        disabled={isGeneratingPdf}
        onClick={() => {
          void handleDownload()
        }}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-[100px] border border-white/[0.07] px-6 py-3 text-sm font-medium text-foreground-muted transition-all duration-200 ease-in-out hover:border-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-70"
      >
        {isGeneratingPdf && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {isGeneratingPdf ? 'Génération...' : downloadLabel}
      </DemoButton>
      {downloadError ? (
        <p className="mt-2 text-xs font-light" style={{ color: '#E5484D' }} role="alert">
          {downloadError}
        </p>
      ) : null}
    </article>
  )
}