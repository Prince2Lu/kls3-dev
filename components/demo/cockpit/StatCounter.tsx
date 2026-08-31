interface StatCounterProps {
  label: string
  value: string | number
}

export default function StatCounter({ label, value }: StatCounterProps) {
  return (
    <div
      className="rounded-2xl border border-white/[0.07] bg-card px-5 py-5"
    >
      <p className="font-display text-3xl font-bold text-accent md:text-4xl">{value}</p>
      <p
        className="mt-2 text-sm font-light text-foreground-muted"
        style={{ letterSpacing: '0.01em' }}
      >
        {label}
      </p>
    </div>
  )
}
