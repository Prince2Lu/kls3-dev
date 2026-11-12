// Pictogramme KLS3 (3 nœuds connectés) repris de public/logo.svg, en SVG inline
type LogoProps = {
  size?: number
  className?: string
}

export default function Logo({ size = 38, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="kls3-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <circle cx="8" cy="20" r="4" fill="url(#kls3-logo-gradient)" />
      <circle cx="28" cy="7" r="4" fill="url(#kls3-logo-gradient)" />
      <circle cx="28" cy="33" r="4" fill="url(#kls3-logo-gradient)" />
      <line x1="8" y1="20" x2="28" y2="7" stroke="url(#kls3-logo-gradient)" strokeWidth="2" opacity="0.9" />
      <line x1="8" y1="20" x2="28" y2="33" stroke="url(#kls3-logo-gradient)" strokeWidth="2" opacity="0.9" />
      <line x1="28" y1="7" x2="28" y2="33" stroke="#0ea5e9" strokeWidth="2" opacity="0.6" />
    </svg>
  )
}
