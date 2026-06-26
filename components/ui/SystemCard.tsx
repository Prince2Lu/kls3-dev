import { largeCardDescStyle, largeCardTitleStyle } from '@/lib/cardTypography'
import { type SystemItem } from '@/lib/types/kls3'

interface SystemCardProps {
  system: SystemItem
  number: string
  highlight?: boolean
  descriptionOverride?: React.ReactNode
}

export default function SystemCard({
  system,
  number,
  highlight = false,
  descriptionOverride,
}: SystemCardProps) {
  return (
    <div
      className="relative flex h-full flex-col justify-between overflow-hidden rounded-[14px] p-6 transition-colors duration-200"
      style={{
        background: highlight ? '#4B7BF5' : '#111111',
        border: highlight ? '0.5px solid #4B7BF5' : '0.5px solid rgba(255,255,255,0.07)',
      }}
    >
      <div>
        <h3
          className="font-display"
          style={{
            ...largeCardTitleStyle,
            color: highlight ? '#FFFFFF' : '#F0EDE8',
          }}
        >
          {system.title}
        </h3>
        <p
          className="mt-2"
          style={{
            ...largeCardDescStyle,
            color: highlight ? 'rgba(255,255,255,0.85)' : 'rgba(240, 237, 232, 0.45)',
          }}
        >
          {descriptionOverride ?? system.description}
        </p>
      </div>
      <span
        className="pointer-events-none absolute bottom-4 right-5 select-none font-display text-5xl font-bold"
        aria-hidden
        style={{
          color: highlight ? '#FFFFFF' : '#4B7BF5',
          opacity: 0.2,
          lineHeight: 1,
        }}
      >
        {number}
      </span>
    </div>
  )
}
