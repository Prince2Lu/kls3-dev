'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from './section-label'

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
}

const stats = [
  { value: '−70%', label: 'temps de transfert de dossier entre pôles' },
  { value: '0', label: 'ressaisie entre vos outils' },
  { value: '< 5j', label: 'délai de mise à jour événementielle' },
  { value: '100%', label: 'traçable, sous contrôle humain' },
]

const nodes = [
  { label: 'Production', y: 14 },
  { label: 'CRM', y: 69 },
  { label: 'Paie', y: 124 },
  { label: 'GED', y: 179 },
  { label: 'Signature', y: 234 },
  { label: 'Patrimoine', y: 289 },
]

export function DiagnosticHero() {
  return (
    <section className="border-b border-white/[0.07] py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <motion.div variants={fadeInUp}>
            <SectionLabel>Diagnostic — chiffres illustratifs</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-6 font-display text-4xl font-bold leading-[1.1] text-foreground md:text-5xl"
          >
            Ce qui reste manuel entre vos logiciels,{' '}
            <span className="text-accent">nous l&apos;orchestrons.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mb-10 max-w-md font-sans text-base font-light text-foreground-muted"
          >
            KLS3 ne remplace aucun de vos outils. Nous automatisons ce qui circule encore à la
            main entre eux — et nous vous montrons, en chiffres, ce que ça vous coûte aujourd&apos;hui.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
            <a
              href="#calculateur"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Estimer mon score de friction
            </a>
            <a
              href="#packs"
              className="rounded-full border border-white/[0.15] px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              Voir les Automation Packs
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
        >
          <svg viewBox="0 0 420 340" className="w-full">
            {nodes.map((n, i) => (
              <g key={n.label}>
                <path
                  d={`M70,${n.y + 16} Q210,${150 - (i - 2.5) * 8} 235,150`}
                  fill="none"
                  stroke="rgba(75,123,245,0.35)"
                  strokeWidth={1.4}
                />
                <rect
                  x={12}
                  y={n.y}
                  width={116}
                  height={32}
                  rx={7}
                  fill="#111111"
                  stroke="rgba(255,255,255,0.07)"
                />
                <text
                  x={24}
                  y={n.y + 20}
                  fontFamily="Inter"
                  fontSize={11}
                  fill="rgba(240,237,232,0.45)"
                >
                  {n.label}
                </text>
              </g>
            ))}

            <path
              d="M270,150 Q320,150 350,150"
              fill="none"
              stroke="rgba(75,123,245,0.35)"
              strokeWidth={1.4}
            />

            <circle cx={248} cy={150} r={38} fill="#111111" stroke="#4B7BF5" strokeWidth={1.4} />
            <text x={238} y={156} fontFamily="Syne" fontSize={20} fontWeight={700} fill="#4B7BF5">
              K
            </text>

            <rect x={352} y={132} width={60} height={36} rx={8} fill="#111111" stroke="rgba(255,255,255,0.07)" />
            <text x={364} y={154} fontFamily="Inter" fontSize={11} fill="rgba(240,237,232,0.45)">
              Client
            </text>
          </svg>
        </motion.div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-6 border-t border-white/[0.07] px-6 pt-10 md:grid-cols-4"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeInUp}>
            <div className="font-display text-2xl font-bold text-accent">{s.value}</div>
            <div className="mt-1 text-xs leading-snug text-foreground-muted">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
      <p className="mx-auto mt-4 max-w-6xl px-6 text-xs italic text-foreground-muted">
        Cibles indicatives à valider avec votre cabinet — non contractuelles.
      </p>
    </section>
  )
}
