import type { CSSProperties } from 'react'

export const legalMainStyle: CSSProperties = {
  maxWidth: 800,
  margin: '0 auto',
  padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 80px)',
}

export const legalH1Style: CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 'clamp(28px, 5vw, 36px)',
  color: '#F0EDE8',
  marginBottom: 40,
  marginTop: 0,
  lineHeight: 1.15,
  letterSpacing: '-0.02em',
}

export const legalH2Style: CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: 18,
  color: '#F0EDE8',
  marginTop: 40,
  marginBottom: 12,
  paddingBottom: 8,
  borderBottom: '0.5px solid rgba(255,255,255,0.07)',
}

export const legalPStyle: CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontWeight: 300,
  fontSize: 15,
  color: 'rgba(240,237,232,0.6)',
  lineHeight: 1.7,
  margin: 0,
}
