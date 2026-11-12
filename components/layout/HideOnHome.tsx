'use client'

import { usePathname } from 'next/navigation'

// La homepage a son propre header/footer (components/home) : on masque ceux du site
export default function HideOnHome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname === '/') return null
  return <>{children}</>
}
