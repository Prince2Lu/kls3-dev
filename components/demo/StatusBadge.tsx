import type { DossierStatus } from '@/lib/types/demo'

const STATUS_LABELS: Record<DossierStatus, string> = {
  en_attente: 'En attente',
  en_cours: 'En cours',
  complet: 'Complet',
}

interface StatusBadgeProps {
  status: DossierStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isComplete = status === 'complet'
  const isInProgress = status === 'en_cours'

  return (
    <span
      className="inline-block whitespace-nowrap rounded-full px-3 py-1 font-medium uppercase"
      style={{
        fontSize: 10,
        letterSpacing: '0.08em',
        color: isComplete || isInProgress ? '#4B7BF5' : 'rgba(240,237,232,0.45)',
        background: isComplete || isInProgress ? 'rgba(75,123,245,0.12)' : 'rgba(255,255,255,0.04)',
        border: '0.5px solid rgba(255,255,255,0.07)',
      }}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}
