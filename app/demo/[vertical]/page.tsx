import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CompositeScoreCard from '@/components/demo/cockpit/CompositeScoreCard'
import DemoScenarioBanner from '@/components/demo/cockpit/DemoScenarioBanner'
import ModuleGrid from '@/components/demo/cockpit/ModuleGrid'
import StatCounter from '@/components/demo/cockpit/StatCounter'
import { getAllVerticalIds, getVerticalConfig } from '@/lib/data/verticals'
import { pageContentStyle } from '@/lib/pageLayout'

interface DemoCockpitPageProps {
  params: Promise<{ vertical: string }>
}

export function generateStaticParams() {
  return getAllVerticalIds().map((vertical) => ({ vertical }))
}

export async function generateMetadata({ params }: DemoCockpitPageProps): Promise<Metadata> {
  const { vertical } = await params
  const config = getVerticalConfig(vertical)

  return {
    title: config ? `Démonstration — ${config.label}` : 'Démonstration',
    robots: { index: false, follow: false },
  }
}

export default async function DemoCockpitPage({ params }: DemoCockpitPageProps) {
  const { vertical } = await params
  const config = getVerticalConfig(vertical)

  if (!config) notFound()

  return (
    <div className="bg-background">
      <div
        style={{
          ...pageContentStyle,
          paddingTop: 'clamp(40px, 5vw, 72px)',
          paddingBottom: 'clamp(64px, 8vw, 128px)',
        }}
      >
        <DemoScenarioBanner companyName={config.scenarioCompanyName} />

        <h1
          className="mt-10 font-display font-semibold text-foreground"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {config.label}
        </h1>
        <p className="mt-3 max-w-xl text-base font-light text-foreground-muted">
          Vue d&apos;ensemble des modules de fluidité opérationnelle pour ce scénario.
        </p>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <CompositeScoreCard
              label={config.compositeScoreLabel}
              value={config.compositeScoreValue}
              subScores={config.subScores}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            {config.counters.map((counter) => (
              <StatCounter key={counter.label} label={counter.label} value={counter.value} />
            ))}
          </div>
        </div>

        <section className="mt-14">
          <p
            className="mb-6 font-medium uppercase text-accent"
            style={{ fontSize: 11, letterSpacing: '0.16em' }}
          >
            <span className="mr-2.5 inline-block h-px w-7 bg-accent align-middle" />
            Modules
          </p>
          <ModuleGrid modules={config.modules} />
        </section>
      </div>
    </div>
  )
}
