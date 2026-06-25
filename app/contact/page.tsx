import type { Metadata } from 'next'
import ContactForm from '@/components/sections/ContactForm'
import { pageContentStyle } from '@/lib/pageLayout'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Décrivez-nous l\'opération qui vous ralentit le plus. Nous vous aidons à identifier les pertes invisibles et les leviers d\'amélioration les plus rapides à mettre en place.',
}

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
              <ul className="mt-3 space-y-1">
                <li>réduire les tâches répétitives,</li>
                <li>fluidifier leurs opérations,</li>
                <li>améliorer leur visibilité,</li>
                <li>centraliser leurs données,</li>
                <li>accélérer l&apos;exécution.</li>
              </ul>
            </div>
          </div>

          <div className="w-full min-w-0">
            <ContactForm />

            <div
              className="mt-10 pt-8"
              style={{
                borderTop: '0.5px solid rgba(255,255,255,0.07)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                fontWeight: 300,
                color: 'rgba(240, 237, 232, 0.45)',
                lineHeight: 1.8,
              }}
            >
              <p>Pas de promesses vagues.</p>
              <p>Pas de transformation théorique.</p>
              <p>Une approche opérationnelle concrète et pilotable.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
