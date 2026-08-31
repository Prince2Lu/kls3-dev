'use client'

import { Loader2 } from 'lucide-react'

export type ReportState = 'idle' | 'generation' | 'genere'

interface ReportGeneratorPanelProps {
  reportState: ReportState
  formerlyPrefix: string
  manualTimeEstimate: string
  generatedTimeLabel: string
  generateLabel: string
  generatingLabel: string
  onGenerate: () => void
}

export default function ReportGeneratorPanel({
  reportState,
  formerlyPrefix,
  manualTimeEstimate,
  generatedTimeLabel,
  generateLabel,
  generatingLabel,
  onGenerate,
}: ReportGeneratorPanelProps) {
  const isIdle = reportState === 'idle'
  const isGenerating = reportState === 'generation'
  const isGenerated = reportState === 'genere'

  return (
    <section className="rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8">
      <p className="text-sm font-light leading-relaxed text-foreground-muted">
        <span className="line-through decoration-white/25">
          {formerlyPrefix}
          {manualTimeEstimate}
        </span>
      </p>
      {isGenerated && (
        <p className="mt-2 text-sm font-medium text-accent">{generatedTimeLabel}</p>
      )}

      <button
        type="button"
        disabled={!isIdle}
        onClick={onGenerate}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-[100px] px-6 py-3 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed"
        style={{
          background: isIdle ? '#4B7BF5' : 'rgba(75,123,245,0.45)',
          opacity: isIdle ? 1 : 0.7,
        }}
      >
        {isGenerating && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {isGenerating ? generatingLabel : generateLabel}
      </button>
    </section>
  )
}