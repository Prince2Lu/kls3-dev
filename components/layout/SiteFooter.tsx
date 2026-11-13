'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { homeFooter } from '@/lib/data/home'
import Wordmark from '@/components/home/Wordmark'
import s from '@/components/home/home.module.css'

// Footer unique du site (design V5). Hors homepage, les ancres renvoient vers les sections de la home.
export default function SiteFooter() {
  const base = usePathname() === '/' ? '' : '/'
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <div>
          <Wordmark /> <span className={s.mono}>{homeFooter.baseline}</span>
          <br />
          <small>{homeFooter.copyright}</small>
        </div>
        <div className={s.links}>
          {homeFooter.links.map((link) => (
            <a key={link.href} href={link.href.startsWith('#') ? `${base}${link.href}` : link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className={s.legal}>
          {homeFooter.legal.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
