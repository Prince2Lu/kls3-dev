import type { Metadata } from 'next'
import { automationPacks } from '@/lib/data/automation-packs'
import { DiagnosticHero } from '@/components/diagnostic/diagnostic-hero'
import { DiagnosticInteractive } from '@/components/diagnostic/diagnostic-interactive'

export const metadata: Metadata = {
  title: 'Diagnostic de friction opérationnelle',
  description:
    "Estimez en 30 secondes le temps et le coût mobilisés par la coordination manuelle entre vos outils, et découvrez les Automation Packs KLS3 adaptés à votre activité.",
  openGraph: {
    title: 'Diagnostic de friction opérationnelle',
    description:
      "KLS3 identifie les frictions invisibles entre vos logiciels et les transforme en systèmes automatisés.",
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function DiagnosticPage() {
  return (
    <div className="bg-background">
      <DiagnosticHero />
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
