'use client'

import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const viewport = { once: true, margin: '-80px' }

interface MotionProps {
  children: ReactNode
  className?: string
}

/** Apparition simple fadeInUp au scroll. */
export function Reveal({ children, className }: MotionProps) {
  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </motion.div>
  )
}

/** Conteneur qui décale l'apparition de ses enfants (StaggerItem). */
export function Stagger({ children, className }: MotionProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </motion.div>
  )
}

/** Enfant animé d'un conteneur Stagger. */
export function StaggerItem({ children, className }: MotionProps) {
  return (
    <motion.div className={className} variants={fadeInUp}>
      {children}
    </motion.div>
  )
}
