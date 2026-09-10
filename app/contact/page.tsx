import type { Metadata } from 'next'
import ContactForm from '@/components/sections/ContactForm'
import { pageContentStyle } from '@/lib/pageLayout'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(
  'Contact',
  'Décrivez l\'opération qui vous ralentit le plus. KLS3 identifie vos frictions invisibles et vous propose les leviers d\'amélioration les plus rapides.',
  { path: '/contact' }
)

export default function ContactPage() {
  return (
    <section style={{ width: '100%' }}>
      <div
        style={{
          ...pageContentStyle,
          paddingTop: 'clamp(60px, 8vw, 128px)',
          paddingBottom: 'clamp(60px, 8vw, 128px)',
        }}
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="max-w-xl">
            <p className="section-label mb-8">Contact</p>
            <h1
              className="text-kls-text"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
              }}
            >
              Décrivez-nous l&apos;opération qui vous ralentit le plus.
            </h1>
            <p
              className="mt-8"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 2vw, 17px)',
                fontWeight: 300,
                color: 'rgba(240, 237, 232, 0.6)',
                lineHeight: 1.7,
              }}
            >
              Nous vous aidons à identifier les pertes invisibles et les leviers
              d&apos;amélioration les plus rapides à mettre en place.
            </p>

            <div
              className="mt-10"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 300,
                color: 'rgba(240, 237, 232, 0.6)',
                lineHeight: 1.8,
              }}
            >
              <p>KLS3 accompagne les entreprises qui souhaitent :</p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '12px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {[
                  'Réduire les tâches répétitives',
                  'Fluidifier leurs opérations',
                  'Améliorer leur visibilité',
                  'Centraliser leurs données',
                  'Accélérer l\'exécution',
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '15px',
                      fontWeight: 300,
                      color: 'rgba(240,237,232,0.7)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#4B7BF5',
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full min-w-0">
            <ContactForm />

            <div
              className="mt-10 pt-8"
              style={{
                borderTop: '0.5px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  margin: '24px 0',
                }}
              >
                {[
                  'Pas de promesses vagues.',
                  'Pas de transformation théorique.',
                  'Une approche opérationnelle concrète et pilotable.',
                ].map((line) => (
                  <div key={line} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        width: '3px',
                        height: '18px',
                        background: '#4B7BF5',
                        borderRadius: '2px',
                        flexShrink: 0,
                      }}
                    />
                    <p
                      style={{
                        margin: 0,
                        fontSize: '15px',
                        fontWeight: 300,
                        color: 'rgba(240,237,232,0.7)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
