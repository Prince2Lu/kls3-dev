import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import QuoteCTA from '@/components/sections/QuoteCTA'
import { caseStudies } from '@/lib/data/caseStudies'
import { Stagger, StaggerItem } from '@/components/ui/Motion'
import { pageSectionVerticalStyle } from '@/lib/pageLayout'

export const metadata: Metadata = {
  title: 'Cas concrets',
  description:
    'Quelques exemples de frictions opérationnelles supprimées grâce à des systèmes plus fluides et plus pilotables.',
}

const fields = [
  { key: 'avant', label: 'Avant' },
  { key: 'friction', label: 'Friction' },
  { key: 'transformation', label: 'Transformation' },
  { key: 'resultat', label: 'Résultat' },
] as const

export default function CasClientsPage() {
  return (
    <>
      <PageHero
        label="Cas concrets"
        title="Des transformations opérationnelles concrètes."
        subtitle="Quelques exemples de frictions opérationnelles supprimées grâce à des systèmes plus fluides et plus pilotables."
      />

      <section className="border-b border-kls-border">
        <div style={pageSectionVerticalStyle}>
        <Stagger>
          {caseStudies.map((cas, i) => (
            <StaggerItem key={cas.id}>
              <article
                className={`py-12 md:py-16 ${i > 0 ? 'border-t border-kls-border' : ''}`}
              >
              <p className="section-label mb-4">{cas.category}</p>
              <h2
                className="text-kls-text max-w-3xl"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                {cas.title}
              </h2>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl">
                {fields.map((field) => (
                  <div key={field.key}>
                    <p className="section-label mb-2">{field.label}</p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9375rem',
                        fontWeight: 300,
                        color: 'rgba(240, 237, 232, 0.6)',
                        lineHeight: 1.65,
                      }}
                    >
                      {cas[field.key]}
                    </p>
                  </div>
                ))}
              </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        </div>
      </section>

      <QuoteCTA
        quote="Les meilleures améliorations opérationnelles sont souvent les plus invisibles."
        ctaLabel="Parler de vos opérations"
        ctaHref="/contact"
      />
    </>
  )
}
