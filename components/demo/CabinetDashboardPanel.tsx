import type { DemoDocumentItem, ReminderStep, StaticDossierRow } from '@/lib/types/demo'
import StatusBadge from './StatusBadge'

interface CabinetDashboardPanelProps {
  cabinetName: string
  liveRow: StaticDossierRow
  liveItems: DemoDocumentItem[]
  staticRows: StaticDossierRow[]
  reminders: ReminderStep[]
}

export default function CabinetDashboardPanel({
  cabinetName,
  liveRow,
  liveItems,
  staticRows,
  reminders,
}: CabinetDashboardPanelProps) {
  const missing = liveItems.filter((item) => !item.received)
  const isComplete = liveRow.status === 'complet'
  const rows = [liveRow, ...staticRows]

  return (
    <section className="rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8">
      <p
        className="mb-3 font-medium uppercase text-accent"
        style={{ fontSize: 11, letterSpacing: '0.16em' }}
      >
        <span className="mr-2.5 inline-block h-px w-7 bg-accent align-middle" />
        Vue cabinet
      </p>

      <h2 className="font-display text-2xl font-semibold text-foreground">{cabinetName}</h2>
      <p className="mt-1 text-sm font-light text-foreground-muted">
        Suivi des pièces en temps réel — mise à jour instantanée.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.07]">
              <th className="pb-3 pr-4 font-medium text-foreground-muted" style={{ fontSize: 11, letterSpacing: '0.08em' }}>
                DOSSIER
              </th>
              <th className="pb-3 pr-4 font-medium text-foreground-muted" style={{ fontSize: 11, letterSpacing: '0.08em' }}>
                STATUT
              </th>
              <th className="pb-3 font-medium text-foreground-muted" style={{ fontSize: 11, letterSpacing: '0.08em' }}>
                PIÈCES
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isLive = row.clientName === liveRow.clientName
              return (
                <tr
                  key={row.clientName}
                  className="border-b border-white/[0.07]"
                  style={isLive ? { background: 'rgba(75,123,245,0.06)' } : undefined}
                >
                  <td className="py-3 pr-4 text-foreground">
                    {row.clientName}
                    {isLive && (
                      <span className="ml-2 text-xs font-medium uppercase text-accent" style={{ letterSpacing: '0.08em' }}>
                        En direct
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-3 font-medium text-foreground">{row.itemsReceived}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 font-display text-base font-semibold text-foreground">
          Relances programmées — {liveRow.clientName}
        </h3>

        {isComplete ? (
          <p className="rounded-xl border border-white/[0.07] px-4 py-3 text-sm font-light text-foreground-muted">
            Dossier complet. Les relances J+3, J+7 et J+14 ont été interrompues.
          </p>
        ) : (
          <>
            <p className="mb-4 text-xs font-light text-foreground-muted">
              {`${missing.length} pièce${missing.length > 1 ? 's' : ''} encore attendue${missing.length > 1 ? 's' : ''}`}
              {' — relances échelonnées tant que le dossier n\'est pas complet.'}
            </p>
            <ul className="space-y-2">
              {reminders.map((step) => (
                <li
                  key={step.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/[0.07] px-4 py-3"
                >
                  <div>
                    <p className="text-sm text-foreground">{step.title}</p>
                    <p className="text-xs font-light text-foreground-muted">{step.channel}</p>
                  </div>
                  <span
                    className="rounded-full px-3 py-1 font-medium uppercase text-accent"
                    style={{ fontSize: 10, letterSpacing: '0.08em', background: 'rgba(75,123,245,0.12)' }}
                  >
                    {step.delayLabel}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {!isComplete && missing.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 font-display text-base font-semibold text-foreground">
            Pièces encore attendues
          </h3>
          <ul className="space-y-1.5">
            {missing.map((item) => (
              <li key={item.id} className="text-sm font-light text-foreground-muted">
                — {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
