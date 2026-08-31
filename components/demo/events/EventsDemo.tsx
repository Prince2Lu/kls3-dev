'use client'

import { useRef, useState } from 'react'
import EventBoard from '@/components/demo/events/EventBoard'
import DemoButton from '@/components/demo/shared/DemoButton'
import {
  columnConfig,
  eventPool,
  initialEvents,
  nextEventStatus,
} from '@/lib/data/verticals/finance/evenements-clients'
import type { ClientEvent } from '@/lib/types/demo'

export default function EventsDemo() {
  const [events, setEvents] = useState<ClientEvent[]>(initialEvents)
  const nextId = useRef(initialEvents.length + 1)

  const handleAdvance = (id: string) => {
    setEvents((current) =>
      current.map((event) => {
        if (event.id !== id) return event
        const next = nextEventStatus(event.status)
        return next ? { ...event, status: next } : event
      }),
    )
  }

  const handleSimulate = () => {
    setEvents((current) => {
      const existing = new Set(current.map((event) => `${event.clientName}|${event.eventType}`))
      const unused = eventPool.filter(
        (entry) => !existing.has(`${entry.clientName}|${entry.eventType}`),
      )
      const pool = unused.length > 0 ? unused : eventPool
      const pick = pool[Math.floor(Math.random() * pool.length)]
      if (!pick) return current

      const id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? `evt-${crypto.randomUUID()}`
          : `evt-${nextId.current}`
      nextId.current += 1

      return [
        ...current,
        {
          id,
          clientName: pick.clientName,
          eventType: pick.eventType,
          status: 'a_qualifier',
        },
      ]
    })
  }

  const handleReset = () => {
    setEvents(initialEvents)
    nextId.current = initialEvents.length + 1
  }

  return (
    <div>
      <DemoButton
        type="button"
        onClick={handleSimulate}
        className="rounded-[100px] bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Simuler un nouvel événement
      </DemoButton>

      <div className="mt-8">
        <EventBoard columns={columnConfig} events={events} onAdvance={handleAdvance} />
      </div>

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
