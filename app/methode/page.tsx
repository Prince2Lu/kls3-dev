import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Motion'
import { pageContentStyle, pageSectionVerticalStyle, sectionContainerStyle } from '@/lib/pageLayout'
import { pageMetadata } from '@/lib/seo'

const parcoursSteps = [
  {
    number: '01',
    title: 'Diagnostic',
    tag: 'Gratuit · Réponse sous 48h',
    text: "Vous nous décrivez l'opération qui vous ralentit le plus. Nous l'analysons et vous proposons une lecture claire des leviers disponibles, sans jargon ni détour.",
  },
  {
    number: '02',
    title: 'Pilote',
    tag: '500 à 3 000€',
    text: "Nous mettons en place une première solution ciblée sur la friction identifiée. Vous voyez l'impact concret avant d'envisager quoi que ce soit de plus large.",
  },
  {
    number: '03',
    title: 'Automation Pack',
    tag: 'Sur devis',
    text: "Une fois le pilote validé, nous construisons et déployons les automatisations à l'échelle de vos opérations, pôle par pôle si nécessaire.",
  },
] as const

export const metadata: Metadata = pageMetadata(
  'Méthode',
  "Diagnostic, pilote, Automation Pack : KLS3 avance par étapes courtes et validées, puis veille sur vos automatisations. Jamais un projet fermé décidé d'avance.",
  { path: '/methode' }
)

export default function MethodePage() {
  return (
    <>
      <PageHero
        label="Méthode"
        title="Diagnostic. Pilote. Déploiement. Puis on continue de veiller."
        subtitle="KLS3 avance par étapes courtes et validées, jamais par un projet fermé décidé d'avance."
      />

      <section style={{ width: '100%' }}>
        <div style={pageSectionVerticalStyle}>
          <Stagger className="grid grid-cols-1 lg:grid-cols-3">
            {parcoursSteps.map((step, index) => {
              const isLast = index === parcoursSteps.length - 1
              return (
                <StaggerItem
                  key={step.number}
                  className={`py-10 first:pt-0 last:pb-0 lg:px-10 lg:py-0 lg:first:pl-0 lg:last:pr-0 ${
                    isLast
                      ? ''
                      : 'border-b-[0.5px] border-[rgba(255,255,255,0.07)] lg:border-b-0 lg:border-r-[0.5px]'
                  }`}
                >
                  <span
                    className="font-display block"
                    aria-hidden
                    style={{
                      fontSize: 40,
                      fontWeight: 700,
                      lineHeight: 1,
                      color: '#4B7BF5',
                      opacity: 0.2,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {step.number}
                  </span>
                  <h2
                    className="mt-5"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      color: '#F0EDE8',
                      lineHeight: 1.2,
                    }}
                  >
                    {step.title}
                  </h2>
                  <p
                    className="mt-3"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: '#4B7BF5',
                    }}
                  >
                    {step.tag}
                  </p>
                  <p
                    className="mt-4"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.0625rem',
                      fontWeight: 300,
                      color: 'rgba(240, 237, 232, 0.45)',
                      lineHeight: 1.7,
                    }}
                  >
                    {step.text}
                  </p>
                </StaggerItem>
              )
            })}
          </Stagger>
        </div>
      </section>

      <section style={{ width: '100%' }}>
        <div
          style={{
            ...pageContentStyle,
            paddingTop: 0,
            paddingBottom: 'clamp(64px, 8vw, 128px)',
          }}
        >
          <Reveal>
            <p className="section-label mb-6">Une fois vos automatisations en place</p>
            <div
              className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
              style={{
                background: '#111111',
                border: '1px solid #4B7BF5',
                borderRadius: 16,
                padding: 'clamp(28px, 4vw, 48px)',
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: '#F0EDE8',
                    lineHeight: 1.15,
                    margin: 0,
                  }}
                >
                  Maintenance
                </h2>
                <p
                  className="mt-3"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#4B7BF5',
                  }}
                >
                  Forfait mensuel, sur devis
                </p>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.0625rem',
                  fontWeight: 300,
                  color: 'rgba(240, 237, 232, 0.6)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Un outil tiers change, une API évolue, un flux se grippe : nous surveillons et
                corrigeons avant que ça ne devienne votre problème. Vous n&apos;avez pas à y penser.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ width: '100%', backgroundColor: '#4B7BF5' }}>
        <div style={sectionContainerStyle}>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 600,
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              La meilleure méthode est celle qu&apos;on n&apos;a pas besoin de vous expliquer deux
              fois.
            </h2>
            <div className="w-full lg:flex lg:justify-end">
              <Link
                href="/contact"
                className="block w-full rounded-full text-center transition-opacity hover:opacity-90 lg:inline-block lg:w-auto"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#4B7BF5',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  fontWeight: 600,
                  padding: '14px 32px',
                  borderRadius: '100px',
                }}
              >
                Démarrer par un diagnostic →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
