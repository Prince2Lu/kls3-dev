'use client'

import { usePathname } from 'next/navigation'

// La homepage et les pages solutions ont leur propre header/footer (components/home) : on masque ceux du site
const OWN_LAYOUT_PATHS = ['/', '/solutions/docflow', '/solutions/agents-ia', '/solutions/sur-mesure']

export default function HideOnHome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (OWN_LAYOUT_PATHS.includes(pathname)) return null
  return <>{children}</>
}
