import Link from 'next/link'
import { Stagger, StaggerItem } from '@/components/ui/Motion'
import { pageContentStyle } from '@/lib/pageLayout'

interface PageHeroProps {
  label: string
  title: React.ReactNode
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
}

export default function PageHero({ label, title, subtitle, ctaLabel, ctaHref }: PageHeroProps) {
  return (
    <section className="border-b border-kls-border" style={{ width: '100%' }}>
      <div
        style={{
          ...pageContentStyle,
          paddingTop: 'clamp(60px, 8vw, 112px)',
          paddingBottom: 'clamp(60px, 8vw, 112px)',
        }}
      >
        <Stagger className="max-w-4xl">
          <StaggerItem>
            <p className="section-label mb-8">{label}</p>
          </StaggerItem>

          <StaggerItem>
            <h1
              className="text-kls-text"
              style={{
                fontSize: 'clamp(2rem, 5.5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
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
              {subtitle}
            </p>
          </StaggerItem>

          {ctaLabel && ctaHref && (
            <StaggerItem className="mt-12">
              <Link
                href={ctaHref}
                className="inline-block w-full rounded-full text-center transition-colors hover:bg-[#3D6AE0] sm:w-auto"
                style={{
                  backgroundColor: '#4B7BF5',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 500,
                  padding: '14px 28px',
                }}
              >
                {ctaLabel}
              </Link>
            </StaggerItem>
          )}
        </Stagger>
      </div>
    </section>
  )
}
