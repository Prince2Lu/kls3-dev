import Link from 'next/link'
import type { PackModuleConfig } from '@/lib/types/demo'

interface ModuleCardProps {
  module: PackModuleConfig
  index: number
}

function CardBody({
  module,
  index,
  upcoming,
}: {
  module: PackModuleConfig
  index: number
  upcoming: boolean
}) {
  const numero = String(index + 1).padStart(2, '0')

  return (
    <>
      <div>
        <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{module.label}</h3>
        <p className="text-sm font-light leading-relaxed text-foreground-muted">
          {module.description}
        </p>
      </div>

      <div className="mt-auto flex items-end justify-between pt-6">
        {upcoming ? (
          <span
            className="rounded-full border border-white/[0.07] px-3 py-1 font-medium uppercase text-foreground-muted"
            style={{ fontSize: 10, letterSpacing: '0.08em' }}
          >
            Bientôt disponible
          </span>
        ) : (
          <span
            className="rounded-full px-3 py-1 font-medium uppercase text-accent"
            style={{ fontSize: 10, letterSpacing: '0.08em', background: 'rgba(75,123,245,0.12)' }}
          >
            Ouvrir le module
          </span>
        )}
        <span
          className="pointer-events-none select-none font-display text-4xl font-bold text-accent"
          aria-hidden
          style={{ opacity: 0.22, lineHeight: 1 }}
        >
          {numero}
        </span>
      </div>
    </>
  )
}

export default function ModuleCard({ module, index }: ModuleCardProps) {
  const upcoming = module.status === 'a_venir'

  if (upcoming) {
    return (
      <div
        className="relative flex h-full flex-col rounded-2xl border border-white/[0.07] bg-card p-6 opacity-50"
        aria-disabled="true"
      >
        <CardBody module={module} index={index} upcoming />
      </div>
    )
  }

  return (
    <Link
      href={module.route}
      className="relative flex h-full flex-col rounded-2xl border border-white/[0.07] bg-card p-6 transition-colors duration-200 hover:border-accent"
    >
      <CardBody module={module} index={index} upcoming={false} />
    </Link>
  )
}
