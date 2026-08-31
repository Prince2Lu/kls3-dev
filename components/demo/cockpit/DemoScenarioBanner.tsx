interface DemoScenarioBannerProps {
  companyName: string
}

export default function DemoScenarioBanner({ companyName }: DemoScenarioBannerProps) {
  return (
    <div
      className="rounded-2xl border border-white/[0.07] px-4 py-3 text-center sm:rounded-[100px] sm:px-6 sm:py-2.5"
      style={{ background: 'rgba(75,123,245,0.08)' }}
    >
      <p
        className="font-medium uppercase text-accent"
        style={{ fontSize: 11, letterSpacing: '0.16em' }}
      >
        <span className="block sm:inline">Scénario de démonstration</span>
        <span className="mx-2 hidden text-foreground-muted sm:inline" aria-hidden>
          ·
        </span>
        <span className="mt-1 block text-foreground sm:mt-0 sm:inline">{companyName}</span>
      </p>
    </div>
  )
}
