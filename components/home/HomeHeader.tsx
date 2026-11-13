'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ChevronDown, Menu } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { headerCtas, headerNav, solutionsMenu } from '@/lib/data/home'
import Wordmark from './Wordmark'
import s from './home.module.css'

// base : '' sur la homepage, '/' sur les autres pages (les ancres renvoient alors vers la home)
export default function HomeHeader({ base = '' }: { base?: string }) {
  const [open, setOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!solutionsOpen) return
    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setSolutionsOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [solutionsOpen])

  const closeAll = () => {
    setOpen(false)
    setSolutionsOpen(false)
  }

  const focusItem = (index: number) => {
    const items = dropdownRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menu"] a')
    if (!items?.length) return
    items[(index + items.length) % items.length].focus()
  }

  const handleDropdownKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && solutionsOpen) {
      event.preventDefault()
      setSolutionsOpen(false)
      toggleRef.current?.focus()
      return
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const items = Array.from(
      dropdownRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menu"] a') ?? []
    )
    const current = items.indexOf(document.activeElement as HTMLAnchorElement)
    setSolutionsOpen(true)
    // Laisse le sous-menu s'afficher avant de déplacer le focus
    const step = event.key === 'ArrowDown' ? 1 : -1
    requestAnimationFrame(() => focusItem(current === -1 ? (step === 1 ? 0 : -1) : current + step))
  }

  return (
    <header className={s.header}>
      <div className={s.wrap}>
        <a href={base ? '/' : '#accueil'} className={s.brand} aria-label="KLS3 — Accueil">
          <Logo />
          <Wordmark />
          <small>
            OPERATIONAL
            <br />
            INTELLIGENCE
          </small>
        </a>
        <nav id="home-nav" className={`${s.nav} ${open ? s.show : ''}`}>
          {headerNav.map((link) =>
            link.href === '#solutions' ? (
              <div
                key={link.href}
                ref={dropdownRef}
                className={`${s.dropdown} ${solutionsOpen ? s.open : ''}`}
                onKeyDown={handleDropdownKeyDown}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) setSolutionsOpen(false)
                }}
              >
                <button
                  ref={toggleRef}
                  type="button"
                  className={s.dropdownToggle}
                  aria-haspopup="true"
                  aria-expanded={solutionsOpen}
                  aria-controls="home-nav-solutions"
                  onClick={() => setSolutionsOpen((value) => !value)}
                >
                  {link.label} <ChevronDown size={14} />
                </button>
                {/* Affiché au survol (CSS), au clic et au clavier (état solutionsOpen) */}
                <div id="home-nav-solutions" role="menu" className={s.submenu}>
                  {solutionsMenu.map((item) => (
                    <a key={item.href} role="menuitem" href={item.href} onClick={closeAll}>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={link.href} href={`${base}${link.href}`} onClick={closeAll}>
                {link.label}
              </a>
            )
          )}
        </nav>
        <div className={s['nav-ctas']}>
          <a className={`${s.btn} ${s['btn-outline']}`} href={`${base}#contact`}>
            {headerCtas.outline}
          </a>
          <a className={`${s.btn} ${s['btn-primary']}`} href={`${base}#contact`}>
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
