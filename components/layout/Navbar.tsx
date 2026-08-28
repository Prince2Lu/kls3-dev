'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/#frictions', label: 'Frictions', hash: '#frictions' as const },
  { href: '/#solutions', label: 'Solutions', hash: '#solutions' as const },
  { href: '/#methode', label: 'Méthode', hash: '#methode' as const },
  { href: '/cas-clients', label: 'Cas concrets' },
  { href: '/diagnostic', label: 'Diagnostic' },
]

const isHashLink = (
  link: (typeof navLinks)[number],
): link is (typeof navLinks)[number] & { hash: string } => 'hash' in link

const ctaStyle = {
  color: '#F0EDE8',
  border: '1px solid rgba(240, 237, 232, 0.35)',
  borderRadius: '100px',
  background: 'transparent',
  fontSize: '18px',
  fontWeight: 600,
  whiteSpace: 'nowrap' as const,
}

function subscribeToHash(onStoreChange: () => void) {
  window.addEventListener('hashchange', onStoreChange)
  window.addEventListener('popstate', onStoreChange)
  return () => {
    window.removeEventListener('hashchange', onStoreChange)
    window.removeEventListener('popstate', onStoreChange)
  }
}

function getHashSnapshot() {
  return window.location.hash
}

function getHashServerSnapshot() {
  return ''
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [pendingHash, setPendingHash] = useState<string | null>(null)
  const pathname = usePathname()
  const urlHash = useSyncExternalStore(subscribeToHash, getHashSnapshot, getHashServerSnapshot)

  useEffect(() => {
    if (pendingHash !== null && urlHash === pendingHash) {
      setPendingHash(null)
    }
  }, [pendingHash, urlHash])

  useEffect(() => {
    if (pathname !== '/') {
      setPendingHash(null)
    }
  }, [pathname])

  const activeHash = pendingHash ?? urlHash

  const handleHashLinkClick = (linkHash: string) => {
    setPendingHash(linkHash)
  }

  const clearHashSelection = () => {
    setPendingHash('')
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isLinkActive = (link: (typeof navLinks)[number]) => {
    if (isHashLink(link)) return pathname === '/' && activeHash === link.hash
    return pathname === link.href || pathname.startsWith(`${link.href}/`)
  }

  const isBlogActive = pathname === '/blog' || pathname.startsWith('/blog/')

  const linkStyle = (active: boolean) => ({
    fontSize: '18px',
    fontWeight: 600,
    color: active ? '#4B7BF5' : 'rgba(240, 237, 232, 0.45)',
    transition: 'color 0.2s',
  })

  const navLinkClassName = (active: boolean) =>
    `font-display ${active ? 'transition-colors duration-200' : 'transition-colors duration-200 hover:!text-[#F0EDE8]'}`

  const ctaClassName =
    'btn-beam font-display transition-colors duration-200 hover:!text-[#4B7BF5]'

  const ctaReassuranceStyle = {
    fontSize: '10px',
    color: 'rgba(240,237,232,0.35)',
    letterSpacing: '0.04em',
  } as const

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{
          backgroundColor: 'rgba(13, 13, 13, 0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '0.5px solid rgba(255, 255, 255, 0.07)',
        }}
      >
        <nav
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 clamp(20px, 5vw, 80px)',
          }}
        >
          <div className="flex items-center justify-between py-3 lg:min-h-[88px] lg:py-4 gap-4">
            <Link href="/" aria-label="KLS3 — Accueil" className="shrink-0" onClick={clearHashSelection}>
              <Image
                src="/logo.png"
                alt="KLS3"
                width={130}
                height={38}
                priority
                className="h-8 w-auto max-w-[130px] lg:h-9"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-7 xl:gap-9 flex-1 justify-end">
              {navLinks.map((link) => {
                const active = isLinkActive(link)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={navLinkClassName(active)}
                    style={linkStyle(active)}
                    onClick={() => {
                      if (isHashLink(link)) handleHashLinkClick(link.hash)
                    }}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="/blog"
                className={navLinkClassName(isBlogActive)}
                style={linkStyle(isBlogActive)}
              >
                Blog
              </Link>
            </div>

            <div className="hidden md:flex flex-col items-center gap-0.5 shrink-0">
              <Link href="/contact" className={ctaClassName} style={{ ...ctaStyle, padding: '8px 20px' }}>
                Analyser mes opérations →
              </Link>
              <span style={ctaReassuranceStyle}>Sans engagement · Réponse sous 48h</span>
            </div>

            <button
              type="button"
              className="lg:hidden p-2 -mr-2"
              style={{ color: '#F0EDE8' }}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[100] flex flex-col"
          style={{ backgroundColor: '#0D0D0D' }}
        >
          <div
            className="flex items-center justify-between h-16 shrink-0"
            style={{ padding: '0 clamp(20px, 5vw, 80px)' }}
          >
            <Link href="/" aria-label="KLS3 — Accueil" onClick={() => { clearHashSelection(); setOpen(false) }}>
              <Image src="/logo.png" alt="KLS3" width={130} height={38} className="h-8 w-auto max-w-[130px]" />
            </Link>
            <button
              type="button"
              className="p-2 -mr-2"
              style={{ color: '#F0EDE8' }}
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-16">
            {navLinks.map((link) => {
              const active = isLinkActive(link)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    if (isHashLink(link)) handleHashLinkClick(link.hash)
                    setOpen(false)
                  }}
                  className={navLinkClassName(active)}
                  style={linkStyle(active)}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className={navLinkClassName(isBlogActive)}
              style={linkStyle(isBlogActive)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={`${ctaClassName} mt-4 text-center`}
              style={{ ...ctaStyle, padding: '12px 28px' }}
            >
              Analyser mes opérations →
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
