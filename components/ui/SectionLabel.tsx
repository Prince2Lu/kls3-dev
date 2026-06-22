interface SectionLabelProps {
  children: string
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p className={`text-xs uppercase tracking-wider text-brand-purple-light font-medium ${className}`}>
      {children}
    </p>
  )
}
