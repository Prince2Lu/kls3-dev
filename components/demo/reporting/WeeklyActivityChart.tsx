import type { WeeklyActivityPoint } from '@/lib/types/demo'

const BAR_AREA_HEIGHT = 140

interface WeeklyActivityChartProps {
  title: string
  points: WeeklyActivityPoint[]
}

export default function WeeklyActivityChart({ title, points }: WeeklyActivityChartProps) {
  const maxValue = Math.max(...points.map((point) => point.value), 1)

  return (
    <section className="rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8">
      <h2 className="font-display text-[15px] font-semibold text-foreground">{title}</h2>
      <div className="mt-6 flex items-end gap-2 sm:gap-4">
        {points.map((point) => {
          const heightPct = (point.value / maxValue) * 100
          return (
            <div key={point.day} className="flex min-w-0 flex-1 flex-col items-center">
              <span className="font-medium text-foreground" style={{ fontSize: 12 }}>
                {point.value}
              </span>
              <div
                className="mt-1 flex w-full items-end justify-center"
                style={{ height: BAR_AREA_HEIGHT }}
              >
                <div
                  className="w-full max-w-10"
                  style={{
                    height: `${heightPct}%`,
                    background: '#4B7BF5',
                    opacity: 0.85,
                    borderRadius: '4px 4px 0 0',
                  }}
                />
              </div>
              <span className="mt-2 font-light text-foreground-muted" style={{ fontSize: 11 }}>
                {point.day}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}