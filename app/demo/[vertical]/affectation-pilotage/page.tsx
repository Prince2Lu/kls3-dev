import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TasksDemo from '@/components/demo/tasks/TasksDemo'
import { getAllVerticalIds, getVerticalConfig } from '@/lib/data/verticals'
import { introText } from '@/lib/data/verticals/finance/affectation-pilotage'
import { pageContentStyle } from '@/lib/pageLayout'

interface TasksPageProps {
  params: Promise<{ vertical: string }>
}

export function generateStaticParams() {
  return getAllVerticalIds().map((vertical) => ({ vertical }))
}

export async function generateMetadata({ params }: TasksPageProps): Promise<Metadata> {
  const { vertical } = await params
  const config = getVerticalConfig(vertical)
  const pack = config?.modules.find((module) => module.id === 'affectation-pilotage')

  return {
    title: pack ? `Démonstration — ${pack.label}` : 'Démonstration',
    robots: { index: false, follow: false },
  }
}

export default async function TasksPage({ params }: TasksPageProps) {
  const { vertical } = await params
  const config = getVerticalConfig(vertical)

  if (!config) notFound()

  const pack = config.modules.find((module) => module.id === 'affectation-pilotage')
  if (!pack || pack.status !== 'disponible') notFound()

  return (
    <div className="bg-background">
      <div
        style={{
          ...pageContentStyle,
          paddingTop: 'clamp(32px, 4vw, 56px)',
          paddingBottom: 'clamp(64px, 8vw, 128px)',
        }}
      >
        <Link
          href={`/demo/${config.id}`}
          className="inline-flex items-center text-sm font-medium text-accent transition-opacity hover:opacity-80"
        >
          ← Retour au cockpit
        </Link>

        <h1
          className="mt-8 font-display font-semibold text-foreground"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Pilotage des tâches — {config.scenarioCompanyName}
        </h1>
        <p className="mt-3 max-w-xl font-light text-foreground-muted" style={{ fontSize: 13 }}>
          {introText}
        </p>

        <div className="mt-10">
          <TasksDemo />
        </div>
      </div>
    </div>
  )
}