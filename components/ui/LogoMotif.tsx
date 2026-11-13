// Motif du logo KLS3 (1 nœud à gauche relié à 2 nœuds à droite), sans dégradé, pour les labels de section
type LogoMotifProps = {
  variant?: 'light' | 'dark'
  size?: number
  className?: string
}

const COLORS = {
  light: { stroke: '#C9CAD6', left: '#9496AE' },
  dark: { stroke: '#6E70A0', left: '#B9BBD3' },
}

export default function LogoMotif({ variant = 'light', size = 16, className }: LogoMotifProps) {
  const { stroke, left } = COLORS[variant]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 20L28 7M8 20L28 33M28 7L28 33" stroke={stroke} strokeWidth="3" />
      <circle cx="8" cy="20" r="5.5" fill={left} />
      <circle cx="28" cy="7" r="5.5" fill="#4B7BF5" />
      <circle cx="28" cy="33" r="5.5" fill="#4B7BF5" />
    </svg>
  )
}
