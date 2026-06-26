import SectionLabel from '@/components/ui/SectionLabel'
import { sectionContainerStyle } from '@/lib/pageLayout'

const pills = [
  'Exécution directe',
  'Sans intermédiaire',
  'Résultats mesurables',
  'Approche concrète',
]

export default function TeamSection() {
  return (
    <section style={{ width: '100%' }}>
      <div style={sectionContainerStyle}>
        <SectionLabel>L&apos;équipe</SectionLabel>
        <div
          className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between"
          style={{
            background: '#111111',
            border: '0.5px solid rgba(255,255,255,0.07)',
            borderRadius: '20px',
            padding: 'clamp(28px, 5vw, 48px) clamp(24px, 4vw, 56px)',
            margin: '0 clamp(16px, 4vw, 40px)',
          }}
        >
          <div className="max-w-2xl">
            <h2
              style={{
                fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
                fontWeight: 600,
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                color: '#F0EDE8',
              }}
            >
              Une équipe. <span style={{ color: '#4B7BF5' }}>Pas une agence.</span>
            </h2>

            <p
              className="mt-8"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                fontWeight: 300,
                color: 'rgba(240, 237, 232, 0.6)',
                lineHeight: 1.8,
              }}
            >
              KLS<span style={{ color: '#4B7BF5' }}>3</span>{' '}
              combine compréhension opérationnelle, pilotage projet et capacité
              d&apos;exécution technique.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {[
                'Pas de couches inutiles.',
                'Pas de promesses abstraites.',
                'Une approche directe pour identifier, simplifier et construire.',
              ].map((line) => (
                <p
                  key={line}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.0625rem',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#F0EDE8',
                    borderLeft: '1.5px solid #4B7BF5',
                    paddingLeft: '12px',
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:flex-col lg:flex-nowrap" style={{ flex: '0 0 auto', maxWidth: 180 }}>
            {pills.map((pill) => (
              <span
                key={pill}
                className="text-center"
                style={{
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  borderRadius: '100px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  color: 'rgba(240, 237, 232, 0.8)',
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
