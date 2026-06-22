import { ReactNode } from 'react'
import { type PillarColor } from '@/lib/types'

interface GlassCardProps {
  children: ReactNode
  accent?: PillarColor
  className?: string
}

const accentStyles = {
  purple: 'before:bg-gradient-to-br before:from-brand-purple/30 before:to-brand-purple-light/20 border-brand-purple/20',
  cyan: 'before:bg-gradient-to-br before:from-brand-cyan/30 before:to-brand-cyan-light/20 border-brand-cyan/20',
  green: 'before:bg-gradient-to-br before:from-brand-green/30 before:to-brand-green-light/20 border-brand-green/20',
}

export default function GlassCard({ children, accent, className = '' }: GlassCardProps) {
  const baseClasses = 'relative overflow-hidden rounded-2xl backdrop-blur-xl'
  const borderClasses = accent ? accentStyles[accent] : 'border-dark-border'
  const gradientClasses = accent
    ? 'before:absolute before:inset-0 before:opacity-40 before:pointer-events-none'
    : ''

  return (
    <div
      className={`${baseClasses} ${borderClasses} ${gradientClasses} border bg-dark-surface ${className}`}
    >
      {children}
    </div>
  )
}
