import type { DemoDocumentItem } from '@/lib/types/demo'
import ChecklistItem from './ChecklistItem'

interface ClientPortalPanelProps {
  clientName: string
  clientContact: string
  deadlineLabel: string
  items: DemoDocumentItem[]
  onToggle: (id: string) => void
}

export default function ClientPortalPanel({
  clientName,
  clientContact,
  deadlineLabel,
  items,
  onToggle,
}: ClientPortalPanelProps) {
  const received = items.filter((item) => item.received).length
  const total = items.length
  const progress = total === 0 ? 0 : Math.round((received / total) * 100)

  return (
    <section className="rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8">
      <p
        className="mb-3 font-medium uppercase text-accent"
        style={{ fontSize: 11, letterSpacing: '0.16em' }}
      >
        <span className="mr-2.5 inline-block h-px w-7 bg-accent align-middle" />
        Espace client
      </p>

      <h2 className="font-display text-2xl font-semibold text-foreground">{clientName}</h2>
      <p className="mt-1 text-sm font-light text-foreground-muted">{clientContact}</p>
      <p className="mt-4 text-sm font-light text-foreground-muted">{deadlineLabel}</p>

      <div className="mt-6">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <span className="text-sm text-foreground">
            {received}/{total} pièces transmises
          </span>
          <span className="text-xs text-foreground-muted">{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="mt-6 mb-3 text-xs font-light text-foreground-muted">
        Cliquez sur une pièce pour simuler sa transmission.
      </p>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <ChecklistItem
              id={item.id}
              label={item.label}
              received={item.received}
              onToggle={onToggle}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
