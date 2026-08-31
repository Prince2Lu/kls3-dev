'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { VERIFICATION_DELAY_MS } from '@/lib/data/verticals/finance/documents-manquants'
import { fadeWaitTransition } from '@/components/demo/shared/motionPresets'

interface ChecklistItemProps {
  id: string
  label: string
  received: boolean
  onToggle: (id: string) => void
}

type ItemPhase = 'idle' | 'verification' | 'recu'

function secondaryCopy(phase: ItemPhase) {
  if (phase === 'verification') return 'Contrôle en cours...'
  if (phase === 'recu') return 'Format valide, lisible'
  return '\u00A0'
}

export default function ChecklistItem({ id, label, received, onToggle }: ChecklistItemProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const clearTimer = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  useEffect(() => () => clearTimer(), [])

  const phase: ItemPhase = received ? 'recu' : isVerifying ? 'verification' : 'idle'

  const handleClick = () => {
    if (received) {
      clearTimer()
      setIsVerifying(false)
      onToggle(id)
      return
    }

    if (isVerifying) {
      clearTimer()
      setIsVerifying(false)
      return
    }

    setIsVerifying(true)
    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null
      setIsVerifying(false)
      onToggle(id)
    }, VERIFICATION_DELAY_MS)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={received}
      aria-busy={isVerifying}
      className="flex w-full items-center gap-3 rounded-xl border border-white/[0.07] px-4 py-3 text-left transition-colors duration-200 hover:border-accent/60"
      style={{
        background: received || isVerifying ? 'rgba(75,123,245,0.08)' : '#111111',
      }}
    >
      <span
        className="flex h-5 w-5 flex-none items-center justify-center rounded-md border transition-colors"
        style={{
          borderColor:
            phase === 'recu' ? '#5DCAA5' : phase === 'verification' ? '#4B7BF5' : 'rgba(255,255,255,0.15)',
          background: phase === 'recu' ? 'rgba(93,202,165,0.15)' : 'transparent',
        }}
        aria-hidden
      >
        {phase === 'verification' && (
          <Loader2 className="h-3 w-3 animate-spin" style={{ color: '#4B7BF5' }} />
        )}
        {phase === 'recu' && <Check className="h-3 w-3" style={{ color: '#5DCAA5' }} />}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={`block text-sm ${
            received || isVerifying ? 'text-foreground' : 'font-light text-foreground-muted'
          }`}
        >
          {label}
        </span>
        <span className="relative mt-0.5 block min-h-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={phase}
              className="absolute inset-x-0 top-0 block text-xs font-light"
              style={{
                color:
                  phase === 'verification' ? '#4B7BF5' : phase === 'recu' ? '#5DCAA5' : 'transparent',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fadeWaitTransition}
            >
              {secondaryCopy(phase)}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>

      <span
        className="ml-auto flex-none text-xs font-medium uppercase"
        style={{
          letterSpacing: '0.08em',
          color: received ? '#5DCAA5' : 'rgba(240,237,232,0.35)',
        }}
      >
        {received ? 'Reçu' : 'À fournir'}
      </span>
    </button>
  )
}
