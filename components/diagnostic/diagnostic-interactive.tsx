'use client'

import { useState } from 'react'
import type { AutomationPack } from '@/lib/data/automation-packs'
import { AutomationPacksGrid } from './automation-packs-grid'
import { FrictionCalculator, type FrictionResult } from './friction-calculator'
import { ScoreCard, CaptureForm } from './results-and-capture'
import { SectionLabel } from './section-label'

type Props = {
  packs: AutomationPack[]
}

export function DiagnosticInteractive({ packs }: Props) {
  const [selected, setSelected] = useState<string[]>([])
  const [result, setResult] = useState<FrictionResult>({ score: 0, heuresMois: 0, coutAn: 0 })

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const selectedPacks = packs.filter((p) => selected.includes(p.id))

  return (
    <>
      <section id="packs" className="border-b border-white/[0.07] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel>Bibliothèque</SectionLabel>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
            Les Automation Packs
          </h2>
          <p className="mb-12 max-w-xl text-base font-light text-foreground-muted">
            Sélectionnez les briques qui parlent le plus à votre quotidien. Chaque pack se
            déploie sans changer vos logiciels actuels.
          </p>

          <AutomationPacksGrid packs={packs} selected={selected} onToggle={toggle} />
        </div>
      </section>

      <section id="calculateur" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel>Calculateur</SectionLabel>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
            Votre score de friction opérationnelle
          </h2>
          <p className="mb-12 max-w-xl text-base font-light text-foreground-muted">
            Répondez en 30 secondes pour estimer le temps et le coût mobilisés par la
            coordination manuelle entre vos outils.
          </p>

          <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <FrictionCalculator onResultChange={setResult} />
            <ScoreCard result={result} selectedPacks={selectedPacks} />
          </div>

          <div className="mx-auto max-w-xl">
            <CaptureForm result={result} selectedPacks={selectedPacks} />
          </div>
        </div>
      </section>
    </>
  )
}
