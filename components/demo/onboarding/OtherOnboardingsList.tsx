import type { OtherOnboardingRow } from '@/lib/types/demo'

interface OtherOnboardingsListProps {
  rows: OtherOnboardingRow[]
  stageCount: number
}

export default function OtherOnboardingsList({ rows, stageCount }: OtherOnboardingsListProps) {
  const denominator = Math.max(stageCount - 1, 1)

  return (
    <ul className="space-y-3">
      {rows.map((row) => {
        const progress = Math.min(100, Math.max(0, (row.stageIndex / denominator) * 100))

        return (
          <li
            key={row.clientName}
            className="rounded-2xl border border-white/[0.07] bg-[#0D0D0D] px-4 py-4 md:px-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-base font-semibold text-foreground">{row.clientName}</p>
              <p className="text-xs font-light text-foreground-muted">{row.currentStageLabel}</p>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}