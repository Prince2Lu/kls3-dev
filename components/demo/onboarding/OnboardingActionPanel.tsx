'use client'

import { Check, Loader2 } from 'lucide-react'
import type { OnboardingActionState, OnboardingStage } from '@/lib/types/demo'

interface OnboardingActionPanelProps {
  stage: OnboardingStage
  actionState: OnboardingActionState
  clientName: string
  isFinal: boolean
  onAction: () => void
}

export default function OnboardingActionPanel({
  stage,
  actionState,
  clientName,
  isFinal,
  onAction,
}: OnboardingActionPanelProps) {
  if (isFinal) {
    return (
      <section className="rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8">
        <div className="flex items-start gap-4">
          <span
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full"
            style={{ background: 'rgba(93,202,165,0.15)', color: '#5DCAA5' }}
            aria-hidden
          >
            <Check className="h-5 w-5" />
          </span>
          <p className="font-display text-[15px] font-semibold leading-snug text-foreground">
            Onboarding terminé — {clientName} a désormais accès à son espace client.
          </p>
        </div>
      </section>
    )
  }

  const isIdle = actionState === 'idle'
  const isBusy = actionState === 'en_cours'
  const isDone = actionState === 'fait'

  return (
    <section className="rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8">
      <h2 className="font-display text-[15px] font-semibold text-foreground">{stage.label}</h2>
      <p className="mt-2 text-[13px] font-light leading-relaxed text-foreground-muted">
        {stage.actionDescription}
      </p>

      <button
        type="button"
        disabled={!isIdle}
        onClick={onAction}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-[100px] px-6 py-3 text-sm font-medium transition-opacity disabled:cursor-not-allowed"
        style={
          isDone
            ? {
                background: 'rgba(93,202,165,0.15)',
                color: '#5DCAA5',
              }
            : {
                background: isBusy ? 'rgba(75,123,245,0.45)' : '#4B7BF5',
                color: '#FFFFFF',
                opacity: isBusy ? 0.7 : 1,
              }
        }
      >
        {isBusy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {isDone && <Check className="h-4 w-4" aria-hidden />}
        {isIdle && stage.actionLabel}
        {isBusy && `${stage.actionLabel}...`}
        {isDone && stage.doneLabel}
      </button>
    </section>
  )
}