import type { ConnectedTool, ToolSyncStatus } from '@/lib/types/demo'
import ToolSyncCard from './ToolSyncCard'

interface ConnectedToolsPanelProps {
  tools: ConnectedTool[]
  statuses: Record<string, ToolSyncStatus>
}

export default function ConnectedToolsPanel({ tools, statuses }: ConnectedToolsPanelProps) {
  const syncedCount = tools.filter((tool) => statuses[tool.id] === 'synchronise').length

  return (
    <section className="rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8">
      <p
        className="mb-3 font-medium uppercase text-accent"
        style={{ fontSize: 11, letterSpacing: '0.16em' }}
      >
        <span className="mr-2.5 inline-block h-px w-7 bg-accent align-middle" />
        Outils connectés
      </p>

      <h2 className="font-display text-2xl font-semibold text-foreground">Mise à jour automatique</h2>
      <p className="mt-1 text-sm font-light text-foreground-muted">
        {syncedCount}/{tools.length} outils à jour
      </p>

      <div className="mt-8 space-y-3" aria-live="polite" aria-atomic="false">
        {tools.map((tool) => (
          <ToolSyncCard key={tool.id} tool={tool} status={statuses[tool.id] ?? 'attente'} />
        ))}
      </div>
    </section>
  )
}