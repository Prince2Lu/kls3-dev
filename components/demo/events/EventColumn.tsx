import type { ClientEvent, EventColumnConfig } from '@/lib/types/demo'
import EventCard from './EventCard'

interface EventColumnProps {
  column: EventColumnConfig
  events: ClientEvent[]
  onAdvance: (id: string) => void
}

export default function EventColumn({ column, events, onAdvance }: EventColumnProps) {
  return (
    <section
      className="flex min-h-[12rem] flex-col rounded-2xl p-3"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      <header className="mb-3 flex items-baseline justify-between gap-2 px-1">
        <h2
          className="font-display font-semibold uppercase text-foreground-muted"
          style={{ fontSize: 13, letterSpacing: '0.08em' }}
        >
          {column.label}
        </h2>
        <span className="text-xs font-medium text-accent">{events.length}</span>
      </header>
      <ul className="flex flex-col gap-2">
        {events.map((event) => (
          <li key={event.id}>
            <EventCard event={event} onAdvance={onAdvance} />
          </li>
        ))}
      </ul>
    </section>
  )
}