import { Check, ClipboardList, Folder, type LucideIcon, Mail, Receipt, RefreshCw } from 'lucide-react'
import type { ConnectedTool, ToolSyncStatus } from '@/lib/types/demo'

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
}

export default function ToolSyncCard({ tool, status }: ToolSyncCardProps) {
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
        }}
      >
        {isSyncing && <RefreshCw className="h-3 w-3 animate-spin" aria-hidden />}
        {isDone && <Check className="h-3 w-3" aria-hidden />}
        {STATUS_LABELS[status]}
      </span>
    </article>
  )
}