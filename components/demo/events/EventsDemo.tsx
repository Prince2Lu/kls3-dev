'use client'

import { useEffect, useRef, useState } from 'react'
import EventBoard from '@/components/demo/events/EventBoard'
import DemoButton from '@/components/demo/shared/DemoButton'
import { getEvenementsClientsPack } from '@/lib/data/verticals/packs'
import { useDemoVertical } from '@/lib/data/verticals/useDemoVertical'
import type { ClientEvent } from '@/lib/types/demo'

export default function EventsDemo() {
  const vertical = useDemoVertical()
  const {
    columnConfig,
    eventPool,
    initialEvents,
    NEW_EVENT_HIGHLIGHT_MS,
    nextEventStatus,
  } = getEvenementsClientsPack(vertical)

  const [events, setEvents] = useState<ClientEvent[]>(initialEvents)
  const nextId = useRef(initialEvents.length + 1)
  const highlightTimers = useRef<number[]>([])

  useEffect(() => {
    return () => {
      highlightTimers.current.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

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
    const existing = new Set(events.map((event) => `${event.clientName}|${event.eventType}`))
    const unused = eventPool.filter(
      (entry) => !existing.has(`${entry.clientName}|${entry.eventType}`),
    )
    const pool = unused.length > 0 ? unused : eventPool
    const pick = pool[Math.floor(Math.random() * pool.length)]
    if (!pick) return

    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? `evt-${crypto.randomUUID()}`
        : `evt-${nextId.current}`
    nextId.current += 1

    setEvents((current) => [
      ...current,
      {
        id,
        clientName: pick.clientName,
        eventType: pick.eventType,
        status: 'a_qualifier',
        isNew: true,
      },
    ])

    const timer = window.setTimeout(() => {
      setEvents((current) =>
        current.map((event) => (event.id === id ? { ...event, isNew: false } : event)),
      )
    }, NEW_EVENT_HIGHLIGHT_MS)
    highlightTimers.current.push(timer)
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
