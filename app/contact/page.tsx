import type { Metadata } from 'next'
import ContactForm from '@/components/sections/ContactForm'
import { pageContentStyle } from '@/lib/pageLayout'
import { pageMetadata } from '@/lib/seo'

const bodyStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 'clamp(15px, 2vw, 17px)',
  fontWeight: 300,
  color: 'rgba(240, 237, 232, 0.6)',
  lineHeight: 1.7,
} as const

const CONTACT_STEPS = [
  {
    n: '01',
    title: 'Vous décrivez votre opération.',
    body: "Quelques minutes suffisent — pas besoin d'un cahier des charges.",
  },
  {
    n: '02',
    title: 'Nous l\'analysons.',
    body: 'Sous 48h, vous recevez une lecture de la friction et des leviers envisageables.',
  },
  {
    n: '03',
    title: 'Nous cadrons ensemble la suite.',
    body: 'Si un pilote ciblé (500 à 3000€) fait sens, nous vous le proposons clairement, sans détour — le diagnostic initial, lui, reste gratuit.',
  },
]

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
        <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2 lg:gap-x-24">
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
            <p className="mt-8" style={bodyStyle}>
              Nous vous aidons à identifier les pertes invisibles et les leviers
              d&apos;amélioration les plus rapides à mettre en place.
            </p>
            <p className="mt-6" style={bodyStyle}>
              Une opération qui ralentit prend rarement la forme d&apos;un problème technique isolé.
              C&apos;est souvent un reporting qui mobilise plusieurs heures chaque semaine, des
              informations dispersées entre trois outils qui ne se parlent pas, une relance qui
              repose sur la mémoire d&apos;une seule personne, ou un onboarding qui varie selon qui
              s&apos;en occupe. KLS3 commence toujours par écouter la friction telle que vous la
              vivez au quotidien, avant de proposer une lecture structurée de ce qui peut être
              simplifié.
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
            <p className="mt-8" style={bodyStyle}>
              Ce premier échange sert à comprendre comment le travail circule aujourd&apos;hui :
              qui saisit quoi, où l&apos;information s&apos;arrête, et ce qui force les équipes à
              compenser à la main. Nous accompagnons des entreprises de 10 à 1000 personnes,
              notamment des professions réglementées pluridisciplinaires en Grand-Est et au
              Luxembourg, sans exiger de changer d&apos;outils pour commencer. L&apos;objectif
              n&apos;est pas un projet informatique : c&apos;est de rendre une opération plus
              fluide, plus visible et plus simple à tenir dans le temps.
            </p>
          </div>

          <div className="w-full min-w-0">
            <div>
              <p className="section-label mb-6">Comment ça se passe</p>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {CONTACT_STEPS.map((step) => (
                  <li
                    key={step.n}
                    style={{
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                      background: '#111111',
                      border: '0.5px solid rgba(255,255,255,0.07)',
                      borderRadius: 14,
                      padding: '20px 22px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 28,
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                        color: '#4B7BF5',
                        flexShrink: 0,
                      }}
                    >
                      {step.n}
                    </span>
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: 17,
                          color: '#F0EDE8',
                          lineHeight: 1.3,
                        }}
                      >
                        {step.title}
                      </p>
                      <p
                        style={{
                          margin: '8px 0 0',
                          fontFamily: 'var(--font-body)',
                          fontSize: 15,
                          fontWeight: 300,
                          color: 'rgba(240,237,232,0.6)',
                          lineHeight: 1.65,
                        }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p
              className="mb-6"
              style={{
                fontSize: '11px',
                letterSpacing: '0.16em',
                color: '#4B7BF5',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
              }}
            >
              Formulaire de contact
            </p>
            <div
              className="p-6 sm:p-8 lg:p-10"
              style={{
                background: '#111111',
                border: '0.5px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
              }}
            >
              <ContactForm />
            </div>

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
