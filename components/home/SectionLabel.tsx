import LogoMotif from '@/components/ui/LogoMotif'
import s from './home.module.css'

// Label de section V5 : texte mono précédé du motif logo
export default function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className={`${s.label} ${dark ? s['on-dark'] : ''}`}>
      <LogoMotif variant={dark ? 'dark' : 'light'} />
      {children}
    </span>
  )
}
