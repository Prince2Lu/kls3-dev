import Link from 'next/link'
import { Stagger, StaggerItem } from '@/components/ui/Motion'

export default function HeroOperational() {
  return (
    <section style={{ width: '100%' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(42px, 5.6vw, 77px) clamp(20px, 5vw, 80px)',
        }}
      >
        <Stagger className="max-w-4xl">
          <StaggerItem>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 22,
                fontSize: 12,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#4B7BF5',
                fontWeight: 500,
              }}
            >
              <span style={{ width: 28, height: 1, background: '#4B7BF5', display: 'inline-block' }} />
              Operational Intelligence
            </div>
          </StaggerItem>

          <StaggerItem>
            <h1
              className="text-kls-text"
              style={{
                fontSize: 'clamp(36px, 6vw, 62px)',
                fontWeight: 600,
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
              }}
            >
              Vos opérations ne devraient plus dépendre de{' '}
              <span className="text-kls-accent">tâches répétitives.</span>
            </h1>
          </StaggerItem>

          <StaggerItem>
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
              KLS<span style={{ color: '#4B7BF5' }}>3</span> identifie les frictions
              invisibles qui ralentissent vos opérations et les transforme en systèmes
              fluides, pilotables et automatisés.
            </p>
          </StaggerItem>

          <StaggerItem className="mt-12 flex flex-col md:flex-row items-start gap-5">
            <Link
              href="/contact"
              className="rounded-full transition-colors hover:bg-[#3D6AE0] text-center w-full md:w-auto"
              style={{
                backgroundColor: '#4B7BF5',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                padding: '14px 28px',
              }}
            >
              Demander une première analyse
            </Link>

            <Link
              href="/cas-clients"
              className="group inline-flex items-center justify-center gap-2 transition-colors hover:!border-[rgba(240,237,232,0.5)] hover:!text-[#F0EDE8] w-full md:w-auto"
              style={{
                color: 'rgba(240,237,232,0.7)',
                border: '1px solid rgba(240,237,232,0.25)',
                borderRadius: '100px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 400,
                padding: '14px 28px',
              }}
            >
              Voir des exemples de frictions résolues
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  )
}
