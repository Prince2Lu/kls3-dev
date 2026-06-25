import {
  largeCardDescStyle,
  largeCardTitleStyle,
  systemWatermarkStyle,
} from '@/lib/cardTypography'
import { type SystemItem } from '@/lib/types/kls3'

interface SystemCardProps {
  system: SystemItem
  number: string
  highlight?: boolean
}

export default function SystemCard({ system, number, highlight = false }: SystemCardProps) {
  return (
    <div
      className="relative h-full overflow-hidden rounded-[14px] transition-colors duration-200 flex flex-col"
      style={{
        background: highlight ? '#4B7BF5' : '#111111',
        border: highlight ? '0.5px solid #4B7BF5' : '0.5px solid rgba(255,255,255,0.07)',
        padding: '32px 28px',
      }}
    >
      <span
        className="font-display pointer-events-none absolute select-none"
        aria-hidden
        style={{
          ...systemWatermarkStyle,
          color: highlight ? '#FFFFFF' : '#4B7BF5',
          opacity: highlight ? 0.2 : 1,
        }}
      >
        {number}
      </span>
      <h3
        className="relative font-display"
        style={{
          ...largeCardTitleStyle,
          color: highlight ? '#FFFFFF' : '#F0EDE8',
        }}
      >
        {system.title}
      </h3>
      <p
        className="relative"
        style={{
          ...largeCardDescStyle,
          color: highlight ? 'rgba(255,255,255,0.85)' : 'rgba(240, 237, 232, 0.45)',
        }}
      >
        {system.description}
      </p>
    </div>
  )
}
