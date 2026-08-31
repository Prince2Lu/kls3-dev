'use client'

import { useState } from 'react'
import OnboardingTracker from '@/components/demo/onboarding/OnboardingTracker'
import OtherOnboardingsList from '@/components/demo/onboarding/OtherOnboardingsList'
import {
  activeOnboardingClientName,
  onboardingStages,
  otherOnboardings,
} from '@/lib/data/verticals/finance/onboarding'

export default function OnboardingDemo() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const lastIndex = onboardingStages.length - 1
  const isComplete = currentStageIndex >= lastIndex

  return (
    <div>
      <h1
        className="font-display font-semibold text-foreground"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        Onboarding — {activeOnboardingClientName}
      </h1>
      <p className="mt-3 max-w-xl text-base font-light text-foreground-muted">
        Un parcours identique pour chaque nouveau dossier, étape par étape.
      </p>

      <section className="mt-10 rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8">
        <p
          className="mb-6 font-medium uppercase text-accent"
          style={{ fontSize: 11, letterSpacing: '0.16em' }}
        >
          <span className="mr-2.5 inline-block h-px w-7 bg-accent align-middle" />
          Parcours du dossier
        </p>
        <OnboardingTracker stages={onboardingStages} currentStageIndex={currentStageIndex} />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            disabled={isComplete}
            onClick={() => setCurrentStageIndex((index) => Math.min(index + 1, lastIndex))}
            className="rounded-[100px] px-6 py-3 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: isComplete ? 'rgba(75,123,245,0.45)' : '#4B7BF5' }}
          >
            {isComplete ? 'Onboarding terminé' : 'Faire avancer le dossier'}
          </button>
          <button
            type="button"
            onClick={() => setCurrentStageIndex(0)}
            className="text-sm font-light text-foreground-muted transition-colors hover:text-foreground sm:px-2"
          >
            Réinitialiser la démo
          </button>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8">
        <p
          className="mb-6 font-medium uppercase text-accent"
          style={{ fontSize: 11, letterSpacing: '0.16em' }}
        >
          <span className="mr-2.5 inline-block h-px w-7 bg-accent align-middle" />
          Autres onboardings en cours
        </p>
        <OtherOnboardingsList rows={otherOnboardings} stageCount={onboardingStages.length} />
      </section>
    </div>
  )
}