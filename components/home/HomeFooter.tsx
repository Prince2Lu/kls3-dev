import Link from 'next/link'
import { homeFooter } from '@/lib/data/home'
import s from './home.module.css'

export default function HomeFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <div>
          <strong style={{ font: '800 19px Syne', color: 'white' }}>{homeFooter.brand}</strong>
          {homeFooter.baseline}
          <br />
          <small>{homeFooter.copyright}</small>
        </div>
        <div>
          {homeFooter.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div>
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
