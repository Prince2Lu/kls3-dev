import type { Metadata } from 'next'
import { automationPacks } from '@/lib/data/automation-packs'
import { DiagnosticHero } from '@/components/diagnostic/diagnostic-hero'
import { DiagnosticInteractive } from '@/components/diagnostic/diagnostic-interactive'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(
  'Diagnostic de friction opérationnelle',
  'Estimez en 30 secondes le temps et le coût mobilisés par la coordination manuelle entre vos outils, et découvrez les Automation Packs KLS3 adaptés à votre activité.',
  { path: '/diagnostic' }
)

export default function DiagnosticPage() {
  return (
    <div className="bg-background">
      <DiagnosticHero />

      <section className="border-b border-white/[0.07] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="max-w-3xl text-base font-light leading-relaxed text-foreground-muted">
            Ce diagnostic n&apos;est pas un audit théorique : c&apos;est une estimation rapide
            de ce que vous coûte aujourd&apos;hui la coordination manuelle entre vos
            outils, avant même d&apos;envisager une intervention. Les chiffres obtenus
            sont indicatifs et servent de point de départ à l&apos;échange avec notre
            équipe, pas de verdict définitif sur votre organisation.
          </p>
        </div>
      </section>

      <DiagnosticInteractive packs={automationPacks} />

      <section className="bg-accent py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-6 font-display text-3xl font-bold text-white">
            Décrivez-nous l&apos;opération qui vous ralentit le plus.
          </h2>
          <a
            href="/contact"
            className="inline-block rounded-full bg-white px-7 py-3 text-sm font-medium text-accent transition-opacity hover:opacity-90"
          >
            Demander une première analyse
          </a>
        </div>
      </section>
    </div>
  )
}
