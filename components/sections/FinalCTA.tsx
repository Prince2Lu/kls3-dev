import Link from 'next/link'
import { sectionContainerStyle } from '@/lib/pageLayout'

export default function FinalCTA() {
  return (
    <section
      id="cas-clients"
      className="scroll-mt-20"
      style={{ width: '100%', backgroundColor: '#4B7BF5' }}
    >
      <div style={sectionContainerStyle}>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 600,
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
              }}
            >
              Décrivez-nous l&apos;opération qui vous ralentit le plus.
            </h2>

            <p
              className="mt-8 max-w-2xl"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 2vw, 17px)',
                fontWeight: 300,
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: 1.7,
              }}
            >
              Nous vous aidons à identifier les pertes invisibles et les leviers
              d&apos;amélioration les plus rapides à mettre en place.
            </p>
          </div>

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
              Demander une première analyse
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
