import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import QuoteCTA from '@/components/sections/QuoteCTA'
import { Stagger, StaggerItem } from '@/components/ui/Motion'
import { pageSectionVerticalStyle } from '@/lib/pageLayout'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(
  'Solutions opérationnelles',
  'KLS3 construit des systèmes fluides, pilotables et adaptés à vos opérations réelles : fluidification, intelligence opérationnelle, automatisation sur-mesure et infrastructure métier.',
  { path: '/solutions' }
)

const solutions = [
  {
    number: '01',
    title: 'Fluidification opérationnelle',
    examples: 'Relances, validations, circulation d\'information, synchronisation, consolidation.',
  },
  {
    number: '02',
    title: 'Intelligence opérationnelle',
    examples: 'Dashboards, alertes, KPIs, supervision, visibilité temps réel.',
  },
  {
    number: '03',
    title: 'Automatisation sur-mesure',
    examples: 'Reporting, onboarding, relances, synchronisation, génération documentaire.',
  },
  {
    number: '04',
    title: 'Infrastructure métier',
    examples: 'Portails internes, outils métiers, cockpits opérationnels, plateformes métier.',
  },
]

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        label="Solutions opérationnelles"
        title="Des systèmes conçus autour des opérations réelles."
        subtitle="KLS3 construit des systèmes fluides, pilotables et adaptés à vos opérations."
        ctaLabel="Découvrir notre approche"
        ctaHref="/methode"
      />

      <section className="border-b border-kls-border">
        <div style={pageSectionVerticalStyle}>
          <Stagger className="grid-kls grid-cols-1 md:grid-cols-2">
            {solutions.map((solution) => (
              <StaggerItem key={solution.title} className="bg-kls-bg p-10 md:p-12 flex flex-col gap-5">
                <span
                  className="font-display text-kls-accent"
                  style={{ fontSize: '2.25rem', fontWeight: 600, lineHeight: 1 }}
                >
                  {solution.number}
                </span>
                <h2
                  className="text-kls-text"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.375rem',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {solution.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    fontWeight: 300,
                    color: 'rgba(240, 237, 232, 0.6)',
                    lineHeight: 1.7,
                  }}
                >
                  {solution.examples}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <QuoteCTA
        quote="Les meilleures opérations sont souvent celles qu'on ne remarque plus."
        ctaLabel="Demander une première analyse"
        ctaHref="/contact"
      />
    </>
  )
}
