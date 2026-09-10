import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import QuoteCTA from '@/components/sections/QuoteCTA'
import { Stagger, StaggerItem } from '@/components/ui/Motion'
import { pageSectionVerticalStyle } from '@/lib/pageLayout'
import { pageMetadata } from '@/lib/seo'

const transformationSteps = [
  {
    number: '01',
    title: 'Identifier les frictions invisibles',
    description: 'Nous analysons les opérations qui ralentissent réellement vos équipes.',
  },
  {
    number: '02',
    title: 'Simplifier les opérations inutiles ou fragiles',
    description: 'Nous supprimons les étapes redondantes et clarifions les flux.',
  },
  {
    number: '03',
    title: 'Automatiser les tâches répétitives',
    description: 'Les opérations à faible valeur ajoutée sont automatisées.',
  },
  {
    number: '04',
    title: 'Rendre les opérations visibles et pilotables',
    description: 'Les données deviennent accessibles et exploitables en temps réel.',
  },
] as const

export const metadata: Metadata = pageMetadata(
  'Méthode',
  'KLS3 applique une approche opérationnelle simple : identifier les frictions réelles, simplifier les opérations inutiles, automatiser les tâches répétitives et rendre les opérations pilotables.',
  { path: '/methode' }
)

export default function MethodePage() {
  return (
    <>
      <PageHero
        label="Méthode"
        title="Identifier. Simplifier. Automatiser. Piloter."
        subtitle="KLS3 applique une approche opérationnelle simple : comprendre les frictions réelles, supprimer les opérations inutiles et construire des systèmes plus fluides."
      />

      <section className="border-b border-kls-border">
        <div style={pageSectionVerticalStyle}>
          <Stagger className="grid-kls grid-cols-1">
            {transformationSteps.map((step) => (
              <StaggerItem
                key={step.number}
                className="bg-kls-bg p-8 md:p-12 flex flex-col md:flex-row gap-6 md:gap-16"
              >
                <span
                  className="font-display text-kls-accent"
                  style={{ fontSize: '3rem', fontWeight: 600, lineHeight: 1 }}
                >
                  {step.number}
                </span>
                <div className="max-w-2xl">
                  <h2
                    className="text-kls-text"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.5rem',
                      fontWeight: 500,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {step.title}
                  </h2>
                  <p
                    className="mt-4"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.0625rem',
                      fontWeight: 300,
                      color: 'rgba(240, 237, 232, 0.6)',
                      lineHeight: 1.7,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <QuoteCTA
        quote="La technologie n'est utile que lorsqu'elle simplifie réellement les opérations."
        ctaLabel="Discuter de vos opérations"
        ctaHref="/contact"
      />
    </>
  )
}
