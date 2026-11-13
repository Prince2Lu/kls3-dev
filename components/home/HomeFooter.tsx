import Link from 'next/link'
import { homeFooter } from '@/lib/data/home'
import Wordmark from './Wordmark'
import s from './home.module.css'

// base : '' sur la homepage, '/' sur les autres pages
export default function HomeFooter({ base = '' }: { base?: string }) {
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
            <a key={link.href} href={`${base}${link.href}`}>
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
