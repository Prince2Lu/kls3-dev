'use client'

import { motion } from 'framer-motion'
import { Check, ClipboardList, Folder, type LucideIcon, Mail, Receipt, RefreshCw } from 'lucide-react'
import type { ConnectedTool, ToolSyncStatus } from '@/lib/types/demo'

const TRACK_TRAVEL_PX = 40

const TOOL_ICONS: Record<string, LucideIcon> = {
  'ti-receipt-2': Receipt,
  'ti-folder': Folder,
  'ti-clipboard-list': ClipboardList,
  'ti-mail': Mail,
}

const STATUS_LABELS: Record<ToolSyncStatus, string> = {
  attente: 'En attente',
  en_cours: 'Synchronisation...',
  synchronise: 'Synchronisé',
}

interface ToolSyncCardProps {
  tool: ConnectedTool
  status: ToolSyncStatus
  delayMs: number
}

export default function ToolSyncCard({ tool, status, delayMs }: ToolSyncCardProps) {
  const Icon = TOOL_ICONS[tool.icon] ?? Folder
  const isSyncing = status === 'en_cours'
  const isDone = status === 'synchronise'

  const badgeColor = isDone ? '#5DCAA5' : isSyncing ? '#4B7BF5' : 'rgba(240,237,232,0.45)'
  const badgeBackground = isDone
    ? 'rgba(93,202,165,0.12)'
    : isSyncing
      ? 'rgba(75,123,245,0.12)'
      : 'rgba(255,255,255,0.04)'

  return (
    <article
      className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-white/[0.07] bg-card px-4 py-4 md:px-5"
      aria-label={`${tool.name} : ${STATUS_LABELS[status]}`}
    >
      <span className="relative h-2 w-12 flex-none" aria-hidden>
        <span
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        />
        <motion.span
          className="absolute left-0 top-1/2 h-2 w-2 rounded-full"
          style={{ background: '#4B7BF5', marginTop: -4 }}
          initial={false}
          animate={
            isSyncing
              ? { x: TRACK_TRAVEL_PX, opacity: 1 }
              : isDone
                ? { x: TRACK_TRAVEL_PX, opacity: 0 }
                : { x: 0, opacity: 0 }
          }
          transition={
            isSyncing
              ? { x: { duration: delayMs / 1000, ease: 'linear' }, opacity: { duration: 0.12 } }
              : isDone
                ? { x: { duration: 0 }, opacity: { duration: 0.15 } }
                : { duration: 0 }
          }
        />
      </span>
      <span
        className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-white/[0.07]"
        style={{ background: isDone ? 'rgba(93,202,165,0.08)' : 'rgba(75,123,245,0.08)' }}
        aria-hidden
      >
        <Icon className="h-5 w-5" style={{ color: isDone ? '#5DCAA5' : '#4B7BF5' }} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-display text-base font-semibold text-foreground">{tool.name}</p>
        {isDone && (
          <p className="mt-0.5 text-xs font-light text-foreground-muted">à l&apos;instant</p>
        )}
      </div>

      <span
        className="ml-auto inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 font-medium uppercase"
        style={{
          fontSize: 10,
          letterSpacing: '0.08em',
          color: badgeColor,
          background: badgeBackground,
          border: '0.5px solid rgba(255,255,255,0.07)',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        {isSyncing && <RefreshCw className="h-3 w-3 animate-spin" aria-hidden />}
        {isDone && <Check className="h-3 w-3" aria-hidden />}
        {STATUS_LABELS[status]}
      </span>
    </article>
  )
}