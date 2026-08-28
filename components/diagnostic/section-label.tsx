export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-px w-7 bg-accent" />
      <span
        className="font-medium uppercase text-accent"
        style={{ fontSize: 11, letterSpacing: '0.18em' }}
      >
        {children}
      </span>
    </div>
  )
}
