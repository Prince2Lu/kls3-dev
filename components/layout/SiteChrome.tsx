'use client'

import { usePathname } from 'next/navigation'
import ContactModal from '@/components/home/ContactModal'
import s from '@/components/home/home.module.css'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

// Routes qui gardent leur propre mise en page, sans header/footer du site
const BARE_PREFIXES = ['/demo', '/carte']

// Header, footer et modale de contact communs à tout le site
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const bare = BARE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))

  if (bare) return <main className="flex-1">{children}</main>

  return (
    <>
      {/* display:contents : le header reste sticky par rapport au body */}
      <div className={`${s.root} ${s.chrome}`}>
        <SiteHeader />
      </div>
      <main className="flex-1">{children}</main>
      <div className={`${s.root} ${s.chrome}`}>
        <SiteFooter />
        <ContactModal />
      </div>
    </>
  )
}
