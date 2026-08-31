import type { CompositeSubScore } from '@/lib/types/demo'

interface CompositeScoreCardProps {
  label: string
  value: number
  subScores: CompositeSubScore[]
}

export default function CompositeScoreCard({
  label,
  value,
  subScores,
}: CompositeScoreCardProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8">
      <p
        className="mb-4 font-medium uppercase text-accent"
        style={{ fontSize: 11, letterSpacing: '0.16em' }}
      >
        <span className="mr-2.5 inline-block h-px w-7 bg-accent align-middle" />
        {label}
      </p>

      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-display text-5xl font-bold text-accent md:text-6xl">{clamped}</span>
        <span className="text-sm font-light text-foreground-muted">/100</span>
      </div>

      <div className="mb-7 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${clamped}%` }}
        />
      </div>

      <ul className="space-y-4">
        {subScores.map((sub) => {
          const subValue = Math.min(100, Math.max(0, sub.value))
          return (
            <li key={sub.label}>
              <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                <span className="font-light text-foreground-muted">{sub.label}</span>
                <span className="font-medium text-foreground">{subValue}</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full bg-accent/80"
                  style={{ width: `${subValue}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
