export default function BrandName({ className }: { className?: string }) {
  return (
    <span className={className}>
      KLS<span style={{
        background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>3</span>
    </span>
  )
}
