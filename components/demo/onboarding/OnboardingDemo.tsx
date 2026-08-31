'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import OnboardingActionPanel from '@/components/demo/onboarding/OnboardingActionPanel'
import OnboardingTracker from '@/components/demo/onboarding/OnboardingTracker'
import OtherOnboardingsList from '@/components/demo/onboarding/OtherOnboardingsList'
import {
  activeOnboardingClientName,
  onboardingStages,
  otherOnboardings,
} from '@/lib/data/verticals/finance/onboarding'
import type { OnboardingActionState } from '@/lib/types/demo'

const ACTION_DELAY_MS = 900

export default function OnboardingDemo() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [actionState, setActionState] = useState<OnboardingActionState>('idle')
  const timeoutsRef = useRef<number[]>([])
  const lastIndex = onboardingStages.length - 1
  const stage = onboardingStages[currentStageIndex] ?? onboardingStages[0]
  const isFinal = currentStageIndex === lastIndex && actionState === 'fait'

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id))
    timeoutsRef.current = []
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const handleAction = () => {
    if (actionState !== 'idle') return

    const stageIndex = currentStageIndex
    clearTimers()
    setActionState('en_cours')

    const doneTimer = window.setTimeout(() => {
      setActionState('fait')
      if (stageIndex >= lastIndex) return

      const nextTimer = window.setTimeout(() => {
        setCurrentStageIndex(stageIndex + 1)
        setActionState('idle')
      }, ACTION_DELAY_MS)
      timeoutsRef.current.push(nextTimer)
    }, ACTION_DELAY_MS)
    timeoutsRef.current.push(doneTimer)
  }

  const handleReset = () => {
    clearTimers()
    setCurrentStageIndex(0)
    setActionState('idle')
  }

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
      </section>

      <div className="mt-6">
        <OnboardingActionPanel
          stage={stage}
          actionState={actionState}
          clientName={activeOnboardingClientName}
          isFinal={isFinal}
          onAction={handleAction}
        />
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleReset}
          className="text-sm font-light text-foreground-muted transition-colors hover:text-foreground"
        >
          Réinitialiser la démo
        </button>
      </div>

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