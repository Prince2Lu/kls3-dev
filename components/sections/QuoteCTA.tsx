import Link from 'next/link'
import { pageContentStyle } from '@/lib/pageLayout'

interface QuoteCTAProps {
  quote: string
  ctaLabel: string
  ctaHref: string
}

export default function QuoteCTA({ quote, ctaLabel, ctaHref }: QuoteCTAProps) {
  return (
    <section style={{ backgroundColor: '#111111', width: '100%' }}>
      <div
        style={{
          ...pageContentStyle,
          paddingTop: 'clamp(48px, 6vw, 80px)',
          paddingBottom: 'clamp(48px, 6vw, 80px)',
        }}
      >
        <div className="max-w-3xl">
          <p
            className="text-kls-text font-display"
            style={{
              fontSize: 'clamp(1.375rem, 3.5vw, 2.25rem)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            {quote}
          </p>

          <div className="mt-10">
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
          </div>
        </div>
      </div>
    </section>
  )
}
