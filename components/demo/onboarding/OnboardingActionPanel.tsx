'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import DemoButton from '@/components/demo/shared/DemoButton'
import { fadeWaitTransition } from '@/components/demo/shared/motionPresets'
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
  const isIdle = actionState === 'idle'
  const isBusy = actionState === 'en_cours'
  const isDone = actionState === 'fait'

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isFinal ? (
        <motion.section
          key="final"
          className="rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fadeWaitTransition}
        >
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
        </motion.section>
      ) : (
        <motion.section
          key={stage.id}
          className="rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fadeWaitTransition}
        >
          <h2 className="font-display text-[15px] font-semibold text-foreground">{stage.label}</h2>
          <p className="mt-2 text-[13px] font-light leading-relaxed text-foreground-muted">
            {stage.actionDescription}
          </p>

          <DemoButton
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={actionState}
                className="inline-flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={fadeWaitTransition}
              >
                {isBusy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                {isDone && <Check className="h-4 w-4" aria-hidden />}
                {isIdle && stage.actionLabel}
                {isBusy && `${stage.actionLabel}...`}
                {isDone && stage.doneLabel}
              </motion.span>
            </AnimatePresence>
          </DemoButton>
        </motion.section>
      )}
    </AnimatePresence>
  )
}