'use client'

interface ChecklistItemProps {
  id: string
  label: string
  received: boolean
  onToggle: (id: string) => void
}

export default function ChecklistItem({ id, label, received, onToggle }: ChecklistItemProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      aria-pressed={received}
      className="flex w-full items-center gap-3 rounded-xl border border-white/[0.07] px-4 py-3 text-left transition-colors duration-200 hover:border-accent/60"
      style={{
        background: received ? 'rgba(75,123,245,0.08)' : '#111111',
      }}
    >
      <span
        className="flex h-5 w-5 flex-none items-center justify-center rounded-md border transition-colors"
        style={{
          borderColor: received ? '#4B7BF5' : 'rgba(255,255,255,0.15)',
          background: received ? '#4B7BF5' : 'transparent',
        }}
        aria-hidden
      >
        {received && (
          <svg viewBox="0 0 12 12" className="h-3 w-3">
            <path
              d="M2 6l3 3 5-6"
              stroke="#fff"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        )}
      </span>
      <span
        className={`text-sm ${received ? 'text-foreground' : 'font-light text-foreground-muted'}`}
      >
        {label}
      </span>
      <span
        className="ml-auto text-xs font-medium uppercase"
        style={{
          letterSpacing: '0.08em',
          color: received ? '#4B7BF5' : 'rgba(240,237,232,0.35)',
        }}
      >
        {received ? 'Reçu' : 'À fournir'}
      </span>
    </button>
  )
}
