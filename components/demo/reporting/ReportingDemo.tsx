'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import ReportGeneratorPanel, {
  type ReportState,
} from '@/components/demo/reporting/ReportGeneratorPanel'
import ReportPreviewCard from '@/components/demo/reporting/ReportPreviewCard'
import WeeklyActivityChart from '@/components/demo/reporting/WeeklyActivityChart'
import DemoButton from '@/components/demo/shared/DemoButton'
import { getReportingPack } from '@/lib/data/verticals/packs'
import { useDemoVertical } from '@/lib/data/verticals/useDemoVertical'

export default function ReportingDemo() {
  const vertical = useDemoVertical()
  const {
    GENERATION_DELAY_MS,
    chartTitle,
    downloadButtonLabel,
    downloadHint,
    formerlyPrefix,
    generateButtonLabel,
    generatedTimeLabel,
    generatingButtonLabel,
    manualTimeEstimate,
    reportSummaryBullets,
    reportTitle,
    reportWeekLabel,
    weeklyActivity,
  } = getReportingPack(vertical)

  const [reportState, setReportState] = useState<ReportState>('idle')
  const timeoutRef = useRef<number | null>(null)

  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => () => clearTimer(), [clearTimer])

  const handleGenerate = () => {
    if (reportState !== 'idle') return
    clearTimer()
    setReportState('generation')
    timeoutRef.current = window.setTimeout(() => {
      setReportState('genere')
      timeoutRef.current = null
    }, GENERATION_DELAY_MS)
  }

  const handleReset = () => {
    clearTimer()
    setReportState('idle')
  }

  return (
    <div>
      <div className="mt-8">
        <WeeklyActivityChart title={chartTitle} points={weeklyActivity} />
      </div>

      <div className="mt-6">
        <ReportGeneratorPanel
          reportState={reportState}
          formerlyPrefix={formerlyPrefix}
          manualTimeEstimate={manualTimeEstimate}
          generatedTimeLabel={generatedTimeLabel}
          generateLabel={generateButtonLabel}
          generatingLabel={generatingButtonLabel}
          onGenerate={handleGenerate}
        />
      </div>

      {reportState === 'genere' && (
        <div className="mt-6">
          <ReportPreviewCard
            title={reportTitle}
            weekLabel={reportWeekLabel}
            bullets={reportSummaryBullets}
            downloadLabel={downloadButtonLabel}
            downloadHint={downloadHint}
            verticalId={vertical}
          />
        </div>
      )}

      <div className="mt-8">
        <DemoButton
          type="button"
          onClick={handleReset}
          className="text-sm font-light text-foreground-muted transition-colors hover:text-foreground"
        >
          Réinitialiser la démo
        </DemoButton>
      </div>
    </div>
  )
}
