/** Filigrane décoratif — SystemCard (coin bas-droit). */
export const systemWatermarkStyle = {
  position: 'absolute' as const,
  bottom: '16px',
  right: '20px',
  fontSize: '56px',
  fontWeight: 700,
  fontFamily: 'var(--font-display)',
  color: '#4B7BF5',
  lineHeight: 1,
} as const

/** Numéros/symboles visibles — FrictionCard, StepCard, ResultCard. */
export const largeCardDecorStyle = {
  fontSize: '44px',
  fontWeight: 700,
  fontFamily: 'var(--font-display)',
  color: '#4B7BF5',
  lineHeight: 1,
  marginBottom: '16px',
} as const

export const largeCardTitleStyle = {
  fontSize: '19px',
  fontWeight: 600,
  fontFamily: 'var(--font-display)',
  color: '#F0EDE8',
} as const

export const largeCardDescStyle = {
  fontSize: '16px',
  fontWeight: 300,
  fontFamily: 'var(--font-body)',
  color: 'rgba(240, 237, 232, 0.45)',
  lineHeight: 1.65,
} as const
