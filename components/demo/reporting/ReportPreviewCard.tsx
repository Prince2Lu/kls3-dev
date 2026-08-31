'use client'

import { useEffect, useState } from 'react'
import DemoButton from '@/components/demo/shared/DemoButton'

interface ReportPreviewCardProps {
  title: string
  weekLabel: string
  bullets: string[]
  downloadLabel: string
  downloadHint: string
}

export default function ReportPreviewCard({
  title,
  weekLabel,
  bullets,
  downloadLabel,
  downloadHint,
}: ReportPreviewCardProps) {
  const [entered, setEntered] = useState(false)

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
        title={downloadHint}
        onClick={(event) => event.preventDefault()}
        className="mt-6 rounded-[100px] border border-white/[0.07] px-6 py-3 text-sm font-medium text-foreground-muted"
      >
        {downloadLabel}
      </DemoButton>
    </article>
  )
}