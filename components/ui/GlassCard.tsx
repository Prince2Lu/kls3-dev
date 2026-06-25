import { ReactNode } from 'react'
import { type PillarColor } from '@/lib/types'

interface GlassCardProps {
  children: ReactNode
  accent?: PillarColor
  className?: string
}

const accentStyles = {
  purple: 'border-[#1E2D4A]/20',
  cyan: 'border-[#334766]/20',
  green: 'border-[#C9A84C]/20',
}

export default function GlassCard({ children, accent, className = '' }: GlassCardProps) {
  const baseClasses = 'rounded-lg bg-[#ECEAE5]'
  const borderClasses = accent ? accentStyles[accent] : 'border-[rgba(30,45,74,0.12)]'

  return (
    <div
      className={`${baseClasses} ${borderClasses} border ${className}`}
    >
      {children}
    </div>
  )
}
