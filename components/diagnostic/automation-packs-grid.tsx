'use client'

import { motion } from 'framer-motion'
import type { AutomationPack } from '@/lib/data/automation-packs'

type Props = {
  packs: AutomationPack[]
  selected: string[]
  onToggle: (id: string) => void
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06 } },
}
const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

export function AutomationPacksGrid({ packs, selected, onToggle }: Props) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-60px' }}
      className="grid grid-cols-1 gap-px overflow-hidden rounded-[20px] bg-white/[0.06] md:grid-cols-2 lg:grid-cols-3"
    >
      {packs.map((pack) => {
        const isSelected = selected.includes(pack.id)
        return (
          <motion.button
            key={pack.id}
            type="button"
            variants={fadeInUp}
            aria-pressed={isSelected}
            onClick={() => onToggle(pack.id)}
            className={[
              'relative flex flex-col gap-4 bg-card p-6 text-left transition-colors',
              'focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent',
              isSelected ? 'bg-[#141b2e]' : 'hover:bg-[#141414]',
            ].join(' ')}
          >
            <span
              className="pointer-events-none absolute right-4 top-2 select-none font-display font-bold text-accent"
              style={{ fontSize: 40, opacity: 0.15 }}
            >
              {pack.numero}
            </span>

            <div className="flex items-start justify-between">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-accent">
                <path
                  d={pack.iconPath}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span
                className={[
                  'flex h-5 w-5 flex-none items-center justify-center rounded-md border transition-colors',
                  isSelected ? 'border-accent bg-accent' : 'border-white/[0.15]',
                ].join(' ')}
              >
                {isSelected && (
                  <svg viewBox="0 0 12 12" className="h-3 w-3">
                    <path
                      d="M2 6l3 3 5-6"
                      stroke="#fff"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                )}
              </span>
            </div>

            <div>
              <h3 className="mb-2 font-display text-base font-bold text-foreground">
                {pack.titre}
              </h3>
              <p className="text-sm font-light leading-relaxed text-foreground-muted">
                {pack.description}
              </p>
            </div>

            <span
              className="inline-block w-fit rounded-full px-3 py-1 font-medium uppercase text-accent"
              style={{ fontSize: 10, letterSpacing: '0.08em', background: 'rgba(75,123,245,0.12)' }}
            >
              Potentiel {pack.potentiel}
            </span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
