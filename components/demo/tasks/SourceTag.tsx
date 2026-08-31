interface SourceTagProps {
  label: string
}

export default function SourceTag({ label }: SourceTagProps) {
  return (
    <span
      className="inline-flex rounded-full font-medium text-foreground-muted"
      style={{
        background: 'rgba(255,255,255,0.06)',
        fontSize: 11,
        padding: '2px 10px',
      }}
    >
      {label}
    </span>
  )
}