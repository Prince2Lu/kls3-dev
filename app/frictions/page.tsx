import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import QuoteCTA from '@/components/sections/QuoteCTA'
import { Stagger, StaggerItem } from '@/components/ui/Motion'
import { pageSectionVerticalStyle } from '@/lib/pageLayout'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(
  'Frictions opérationnelles',
  'Reporting manuel, validations lentes, relances répétitives, données dispersées : KLS3 aide les entreprises à identifier et supprimer les frictions qui ralentissent leurs opérations.',
  { path: '/frictions' }
)

const detailedFrictions = [
  {
    title: 'Reporting manuel',
    consequences: 'Temps perdu, erreurs, données obsolètes, faible visibilité.',
  },
  {
    title: 'Données dispersées',
    consequences: 'Perte d\'information, incohérences, décisions ralenties.',
  },
  {
    title: 'Relances répétitives',
    consequences: 'Retards, oublis, surcharge mentale, dépendance humaine.',
  },
  {
    title: 'Validations lentes',
    consequences: 'Ralentissement, goulots d\'étranglement, manque de fluidité.',
  },
  {
    title: 'Manque de visibilité',
    consequences: 'Perte de réactivité, mauvaise anticipation, faible pilotage.',
  },
]

export default function FrictionsPage() {
  return (
    <>
      <PageHero
        label="Frictions opérationnelles"
        title="Les pertes de temps les plus coûteuses sont souvent devenues invisibles."
        subtitle="Reporting manuel, validations lentes, relances répétitives, données dispersées : KLS3 aide les entreprises à identifier et supprimer les frictions qui ralentissent leurs opérations au quotidien."
        ctaLabel="Demander une première analyse"
        ctaHref="/contact"
      />

      {/* Section intro */}
      <section className="border-b border-kls-border">
        <div style={pageSectionVerticalStyle}>
          <div className="max-w-3xl">
            <h2
              className="text-kls-text"
              style={{
                fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
                fontWeight: 600,
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
              }}
            >
              Les entreprises n&apos;ont plus un problème d&apos;outils.
            </h2>
            <p
              className="mt-6"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                fontWeight: 300,
                color: 'rgba(240, 237, 232, 0.6)',
                lineHeight: 1.8,
              }}
            >
              La majorité des entreprises disposent déjà de nombreux outils. Pourtant,
              les opérations restent lentes, dépendantes de tâches manuelles et difficiles
              à piloter. Le problème vient d&apos;opérations dispersées, de processus fragiles,
              de dépendances humaines et d&apos;une absence de visibilité claire.
            </p>
          </div>
        </div>
      </section>

      {/* Section détaillée */}
      <section className="border-b border-kls-border">
        <div style={pageSectionVerticalStyle}>
          <Stagger className="grid-kls grid-cols-1">
            {detailedFrictions.map((item) => (
              <StaggerItem
                key={item.title}
                className="bg-kls-bg p-8 md:p-10 flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 md:gap-12"
              >
                <h3
                  className="text-kls-text md:w-1/3"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.0625rem',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                </h3>
                <div className="md:flex-1">
                  <p className="section-label mb-2">Conséquences</p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      fontWeight: 300,
                      color: 'rgba(240, 237, 232, 0.6)',
                      lineHeight: 1.65,
                    }}
                  >
                    {item.consequences}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <QuoteCTA
        quote="Chaque opération inutilement complexe finit par ralentir toute l'organisation."
        ctaLabel="Parler de vos frictions opérationnelles"
        ctaHref="/contact"
      />
    </>
  )
}
