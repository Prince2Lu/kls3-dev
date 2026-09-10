import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import OnboardingDemo from '@/components/demo/onboarding/OnboardingDemo'
import { getAllVerticalIds, getVerticalConfig } from '@/lib/data/verticals'
import { pageContentStyle } from '@/lib/pageLayout'
import { demoMetadata } from '@/lib/seo'

interface OnboardingPageProps {
  params: Promise<{ vertical: string }>
}

export function generateStaticParams() {
  return getAllVerticalIds().map((vertical) => ({ vertical }))
}

export async function generateMetadata({ params }: OnboardingPageProps): Promise<Metadata> {
  const { vertical } = await params
  const config = getVerticalConfig(vertical)
  const pack = config?.modules.find((module) => module.id === 'onboarding')

  return demoMetadata(
    pack ? `Démonstration — ${pack.label}` : 'Démonstration',
    `/demo/${vertical}/onboarding`
  )
}

export default async function OnboardingPage({ params }: OnboardingPageProps) {
  const { vertical } = await params
  const config = getVerticalConfig(vertical)

  if (!config) notFound()

  const pack = config.modules.find((module) => module.id === 'onboarding')
  if (!pack || pack.status !== 'disponible') notFound()

  return (
    <div className="bg-background">
      <div
        style={{
          ...pageContentStyle,
          paddingTop: 'clamp(32px, 4vw, 56px)',
          paddingBottom: 'clamp(64px, 8vw, 128px)',
        }}
      >
        <Link
          href={`/demo/${config.id}`}
          className="inline-flex items-center text-sm font-medium text-accent transition-opacity hover:opacity-80"
        >
          ← Retour au cockpit
        </Link>

        <div className="mt-8">
          <OnboardingDemo />
        </div>
      </div>
    </div>
  )
}