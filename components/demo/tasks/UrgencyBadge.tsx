import type { TaskUrgency } from '@/lib/types/demo'
import { urgencyLabels } from '@/lib/data/verticals/finance/affectation-pilotage'

const STYLES: Record<TaskUrgency, { background: string; color: string }> = {
  urgent: { background: 'rgba(229,72,77,0.15)', color: '#E5484D' },
  a_traiter: { background: 'rgba(239,159,39,0.15)', color: '#EF9F27' },
  en_attente: { background: 'rgba(255,255,255,0.06)', color: 'rgba(240,237,232,0.45)' },
}

interface UrgencyBadgeProps {
  urgency: TaskUrgency
}

export default function UrgencyBadge({ urgency }: UrgencyBadgeProps) {
  const style = STYLES[urgency]

  return (
    <span
      className="inline-flex rounded-full font-medium"
      style={{
        background: style.background,
        color: style.color,
        fontSize: 11,
        padding: '2px 10px',
      }}
    >
      {urgencyLabels[urgency]}
    </span>
  )
}