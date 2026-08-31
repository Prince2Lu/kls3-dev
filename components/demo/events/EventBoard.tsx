'use client'

import type { ClientEvent, EventColumnConfig } from '@/lib/types/demo'
import EventColumn from './EventColumn'

interface EventBoardProps {
  columns: EventColumnConfig[]
  events: ClientEvent[]
  onAdvance: (id: string) => void
}

export default function EventBoard({ columns, events, onAdvance }: EventBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {columns.map((column) => (
        <EventColumn
          key={column.status}
          column={column}
          events={events.filter((event) => event.status === column.status)}
          onAdvance={onAdvance}
        />
      ))}
    </div>
  )
}