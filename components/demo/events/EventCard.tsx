'use client'

import {
  Building2,
  Check,
  FileText,
  FileX,
  type LucideIcon,
  TriangleAlert,
  Users,
  UserStar,
} from 'lucide-react'
import DemoButton from '@/components/demo/shared/DemoButton'
import type { ClientEvent, EventStatus } from '@/lib/types/demo'
import {
  eventActionLabels,
  eventTypeDetails,
  eventTypeIcons,
} from '@/lib/data/verticals/finance/evenements-clients'

const FALLBACK_NOTE = 'Détails à venir.'

function contextualNote(eventType: string, status: EventStatus): string {
  const detail = eventTypeDetails[eventType]
  if (!detail) return FALLBACK_NOTE
  if (status === 'a_qualifier') return detail.detectedInfo
  if (status === 'en_cours') return detail.qualificationNote
  return detail.resolutionNote
}

function noteColor(status: EventStatus): string {
  if (status === 'en_cours') return '#4B7BF5'
  if (status === 'resolu') return '#5DCAA5'
  return 'rgba(240,237,232,0.6)'
}

const ICONS: Record<string, LucideIcon> = {
  'ti-users': Users,
  'ti-file-x': FileX,
  'ti-user-star': UserStar,
  'ti-file-description': FileText,
  'ti-building': Building2,
  'ti-alert-triangle': TriangleAlert,
}

interface EventCardProps {
  event: ClientEvent
  onAdvance: (id: string) => void
}

export default function EventCard({ event, onAdvance }: EventCardProps) {
  const isNew = event.isNew === true
  const isResolved = event.status === 'resolu'
  const actionLabel = eventActionLabels[event.status]
  const iconKey = eventTypeIcons[event.eventType]
  const Icon = (iconKey && ICONS[iconKey]) || FileText
  const isAlert = iconKey === 'ti-alert-triangle'
  const iconColor = isResolved ? '#5DCAA5' : isAlert ? '#EF9F27' : '#4B7BF5'
  const iconBg = isResolved
    ? 'rgba(93,202,165,0.15)'
    : isAlert
      ? 'rgba(239,159,39,0.12)'
      : 'rgba(75,123,245,0.08)'

  return (
    <article
      className="rounded-xl px-3.5 py-3"
      style={{
        background: isNew
          ? 'rgba(75,123,245,0.06)'
          : isResolved
            ? 'rgba(93,202,165,0.08)'
            : '#111111',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: isNew ? '#4B7BF5' : 'rgba(255,255,255,0.07)',
        transition: 'border-color 800ms ease, background-color 800ms ease',
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-white/[0.07]"
          style={{ color: iconColor, background: iconBg }}
          aria-hidden
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{event.clientName}</p>
          <p className="mt-0.5 text-xs font-light text-foreground-muted">{event.eventType}</p>
        </div>
        {isResolved && (
          <Check className="mt-1 h-4 w-4 flex-none" style={{ color: '#5DCAA5' }} aria-hidden />
        )}
      </div>

      <p
        className="mt-2.5 text-xs font-light leading-relaxed"
        style={{ color: noteColor(event.status), fontSize: 12 }}
      >
        {contextualNote(event.eventType, event.status)}
      </p>

      {actionLabel && (
        <DemoButton
          type="button"
          onClick={() => onAdvance(event.id)}
          className="mt-3 w-full rounded-[100px] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: '#4B7BF5' }}
        >
          {actionLabel}
        </DemoButton>
      )}
    </article>
  )
}
