import { type CaseStudy } from '@/lib/types/kls3'

const categoryLabelStyle = {
  fontSize: '11px',
  letterSpacing: '0.16em',
  color: '#4B7BF5',
  textTransform: 'uppercase' as const,
  marginBottom: '12px',
  fontFamily: 'var(--font-body)',
  fontWeight: 400,
}

const titleStyle = {
  fontSize: 'clamp(20px, 4vw, 26px)',
  fontWeight: 600,
  color: '#F0EDE8',
  margin: '0 0 20px 0',
  fontFamily: 'var(--font-display)',
  lineHeight: 1.25,
}

const gridStyle = {
  gap: '8px',
}

const cardBaseStyle = {
  padding: '24px',
  borderRadius: '14px',
  minHeight: '120px',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '10px',
}

const fieldLabelStyle = {
  fontSize: '19px',
  fontWeight: 600,
  fontFamily: 'var(--font-display)',
  color: '#4B7BF5',
  letterSpacing: 'normal',
  textTransform: 'none' as const,
}

const bodyStyle = {
  fontSize: '16px',
  color: '#F0EDE8',
  lineHeight: 1.65,
  fontWeight: 300,
  margin: 0,
  fontFamily: 'var(--font-body)',
}

const fields = [
  { key: 'avant', label: 'Avant', highlight: false },
  { key: 'friction', label: 'Friction', highlight: false },
  { key: 'transformation', label: 'Transformation', highlight: false },
  { key: 'resultat', label: 'Résultat', highlight: true },
] as const

interface CaseStudyBlockProps {
  cas: CaseStudy
  isLast?: boolean
}

export default function CaseStudyBlock({ cas, isLast = false }: CaseStudyBlockProps) {
  return (
    <article style={{ marginBottom: isLast ? 0 : 'clamp(32px, 6vw, 50px)' }}>
      <p style={categoryLabelStyle}>— {cas.category}</p>
      <h2 style={titleStyle}>{cas.title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" style={gridStyle}>
        {fields.map((field) => {
          const highlight = field.highlight
          return (
            <div
              key={field.key}
              style={{
                ...cardBaseStyle,
                background: highlight ? '#4B7BF5' : '#111111',
              }}
            >
              <span
                style={{
                  ...fieldLabelStyle,
                  color: highlight ? 'rgba(255,255,255,0.7)' : '#4B7BF5',
                }}
              >
                {field.label}
              </span>
              <p
                style={{
                  ...bodyStyle,
                  color: highlight ? '#ffffff' : '#F0EDE8',
                }}
              >
                {cas[field.key]}
              </p>
            </div>
          )
        })}
      </div>
    </article>
  )
}
