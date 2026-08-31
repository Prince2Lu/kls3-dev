import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import StatCounter from '@/components/demo/cockpit/StatCounter'
import ReportingDemo from '@/components/demo/reporting/ReportingDemo'
import { getAllVerticalIds, getVerticalConfig } from '@/lib/data/verticals'
import { reportingKpis } from '@/lib/data/verticals/finance/reporting'
import { pageContentStyle } from '@/lib/pageLayout'

interface ReportingPageProps {
  params: Promise<{ vertical: string }>
}

export function generateStaticParams() {
  return getAllVerticalIds().map((vertical) => ({ vertical }))
}

export async function generateMetadata({ params }: ReportingPageProps): Promise<Metadata> {
  const { vertical } = await params
  const config = getVerticalConfig(vertical)
  const pack = config?.modules.find((module) => module.id === 'reporting')

  return {
    title: pack ? `Démonstration — ${pack.label}` : 'Démonstration',
    robots: { index: false, follow: false },
  }
}

export default async function ReportingPage({ params }: ReportingPageProps) {
  const { vertical } = await params
  const config = getVerticalConfig(vertical)

  if (!config) notFound()

  const pack = config.modules.find((module) => module.id === 'reporting')
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
          Reporting — {config.scenarioCompanyName}
        </h1>
        <p className="mt-3 max-w-xl text-base font-light text-foreground-muted">
          {pack.description}
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {reportingKpis.map((kpi) => (
            <StatCounter key={kpi.label} label={kpi.label} value={kpi.value} />
          ))}
        </div>

        <ReportingDemo />
      </div>
    </div>
  )
}