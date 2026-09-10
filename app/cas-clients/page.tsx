import type { Metadata } from 'next'
import CaseStudyBlock from '@/components/sections/CaseStudyBlock'
import QuoteCTA from '@/components/sections/QuoteCTA'
import { caseStudies } from '@/lib/data/caseStudies'
import { pageContentStyle } from '@/lib/pageLayout'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(
  'Cas concrets',
  'Quelques exemples de frictions opérationnelles supprimées grâce à des systèmes plus fluides et plus pilotables.',
  { path: '/cas-clients' }
)

export default function CasClientsPage() {
  return (
    <>
      <section style={{ width: '100%' }}>
        <div
          style={{
            ...pageContentStyle,
            paddingTop: 'clamp(45px, 5.6vw, 90px)',
            paddingBottom: 'clamp(45px, 5.6vw, 90px)',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.16em',
                color: '#4B7BF5',
                textTransform: 'uppercase',
                marginBottom: '8px',
                fontFamily: 'var(--font-body)',
              }}
            >
              — Cas concrets
            </p>
            <h1
              className="text-kls-text"
              style={{
                fontSize: 'clamp(2rem, 5.5vw, 4rem)',
                fontWeight: 600,
                color: '#F0EDE8',
                fontFamily: 'var(--font-display)',
                margin: 0,
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
              }}
            >
              Des transformations opérationnelles concrètes.
            </h1>
            <p
              className="mt-8 max-w-2xl"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 2vw, 17px)',
                fontWeight: 300,
                color: 'rgba(240, 237, 232, 0.6)',
                lineHeight: 1.7,
              }}
            >
              Quelques exemples de frictions opérationnelles supprimées grâce à des systèmes plus
              fluides et plus pilotables.
            </p>
          </div>

          <div className="mt-16" />

          {caseStudies.map((cas, i) => (
            <CaseStudyBlock key={cas.id} cas={cas} isLast={i === caseStudies.length - 1} />
          ))}
        </div>
      </section>

      <QuoteCTA
        quote="Les meilleures améliorations opérationnelles sont souvent les plus invisibles."
        ctaLabel="Parler de vos opérations"
        ctaHref="/contact"
        variant="accent"
      />
    </>
  )
}
