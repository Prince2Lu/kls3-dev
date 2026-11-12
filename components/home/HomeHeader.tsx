'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { headerCtas, headerNav } from '@/lib/data/home'
import s from './home.module.css'

export default function HomeHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className={s.header}>
      <div className={s.wrap}>
        <a href="#accueil" className={s.brand} aria-label="KLS3 — Accueil">
          <Logo />
          <strong>KLS3</strong>
          <small>
            OPERATIONAL
            <br />
            INTELLIGENCE
          </small>
        </a>
        <nav id="home-nav" className={`${s.nav} ${open ? s.show : ''}`}>
          {headerNav.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={s['nav-ctas']}>
          <a className={`${s.btn} ${s['btn-outline']}`} href="#contact">
            {headerCtas.outline}
          </a>
          <a className={`${s.btn} ${s['btn-primary']}`} href="#contact">
            {headerCtas.primary}
          </a>
        </div>
        <button
          type="button"
          className={s.menu}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          aria-controls="home-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  )
}
