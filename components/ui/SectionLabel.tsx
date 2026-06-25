import { type CSSProperties, type ReactNode } from 'react'

const labelStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 22,
  fontSize: 12,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: '#4B7BF5',
  fontWeight: 500,
}

interface SectionLabelProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export default function SectionLabel({ children, className, style }: SectionLabelProps) {
  return (
    <div className={className} style={{ ...labelStyle, ...style }}>
      <span style={{ width: 28, height: 1, background: '#4B7BF5', display: 'inline-block' }} />
      {children}
    </div>
  )
}
