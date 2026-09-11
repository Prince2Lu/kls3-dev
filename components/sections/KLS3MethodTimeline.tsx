import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Motion'
import { sectionContainerStyle } from '@/lib/pageLayout'

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

export default function KLS3MethodTimeline() {
  return (
    <section
      id="methode"
      className="scroll-mt-20"
      style={{ width: '100%' }}
    >
      <div style={sectionContainerStyle}>
        <SectionLabel>Méthode</SectionLabel>
        <h2
          className="text-kls-text max-w-4xl"
          style={{
            fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
          }}
        >
          Diagnostic. Pilote. Déploiement. Puis on continue de veiller.
        </h2>
        <p
          className="mt-6 max-w-2xl"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 2vw, 17px)',
            fontWeight: 300,
            color: 'rgba(240, 237, 232, 0.6)',
            lineHeight: 1.7,
          }}
        >
          KLS3 avance par étapes courtes et validées, jamais par un projet fermé décidé d&apos;avance.
        </p>

        <Stagger className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {parcoursSteps.map((step) => {
            return (
              <StaggerItem key={step.number}>
                <div
                  className="px-6 py-8 lg:p-8"
                  style={{
                    background: '#111111',
                    borderRadius: 16,
                  }}
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
                  <h3
                    className="mt-4"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      color: '#F0EDE8',
                      lineHeight: 1.2,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-2"
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
                    className="mt-3"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      fontWeight: 300,
                      color: 'rgba(240, 237, 232, 0.45)',
                      lineHeight: 1.7,
                    }}
                  >
                    {step.text}
                  </p>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>

        <Reveal>
          <p className="section-label mb-4 mt-14">Une fois vos automatisations en place</p>
          <div
            className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12"
            style={{
              background: '#111111',
              border: '1px solid #4B7BF5',
              borderRadius: 16,
              padding: 'clamp(24px, 3vw, 36px)',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: '#F0EDE8',
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                Maintenance
              </h3>
              <p
                className="mt-2"
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
                fontSize: '0.9375rem',
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
  )
}
