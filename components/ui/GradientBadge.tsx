'use client'

import { ReactNode } from 'react'

interface GradientBadgeProps {
  children: ReactNode
  showPulse?: boolean
  className?: string
}

export default function GradientBadge({ children, showPulse = false, className = '' }: GradientBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${className}`}
      style={{
        borderColor: 'rgba(16,185,129,0.4)',
        background: 'rgba(16,185,129,0.12)'
      }}
    >
      {showPulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
        </span>
      )}
      <span className="text-sm" style={{ color: '#34d399' }}>{children}</span>
    </div>
  )
}
