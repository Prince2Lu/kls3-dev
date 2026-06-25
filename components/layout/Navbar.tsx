'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/#frictions', label: 'Frictions', hash: '#frictions' },
  { href: '/#solutions', label: 'Solutions', hash: '#solutions' },
  { href: '/#methode', label: 'Méthode', hash: '#methode' },
  { href: '/#cas-clients', label: 'Cas concrets', hash: '#cas-clients' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [hash, setHash] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash)
    updateHash()
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (linkHash: string) => pathname === '/' && hash === linkHash
  const isBlogActive = pathname === '/blog' || pathname.startsWith('/blog/')

  const linkStyle = (active: boolean) => ({
    fontSize: '18px',
    fontWeight: 600,
    color: active ? '#4B7BF5' : '#F0EDE8',
  })

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
          <div className="flex items-center justify-between h-16">
            <Link href="/" aria-label="KLS3 — Accueil" className="shrink-0">
              <Image
                src="/logo.png"
                alt="KLS3"
                width={110}
                height={32}
                priority
                className="h-7 w-auto max-w-[110px]"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-7 xl:gap-9">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display transition-colors duration-200 hover:!text-[#4B7BF5]"
                  style={linkStyle(isActive(link.hash))}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/blog"
                className="font-display transition-colors duration-200 hover:!text-[#4B7BF5]"
                style={linkStyle(isBlogActive)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="transition-all duration-200 hover:!bg-[#4B7BF5] hover:!border-[#4B7BF5]"
                style={{
                  border: '1px solid rgba(240,237,232,0.4)',
                  color: '#F0EDE8',
                  borderRadius: '100px',
                  padding: '8px 20px',
                  fontSize: '13px',
                  background: 'transparent',
                  fontFamily: 'var(--font-body)',
                  whiteSpace: 'nowrap',
                }}
              >
                Première analyse
              </Link>
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
            <Link href="/" aria-label="KLS3 — Accueil" onClick={() => setOpen(false)}>
              <Image src="/logo.png" alt="KLS3" width={110} height={32} className="h-7 w-auto" />
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display transition-colors duration-200 hover:!text-[#4B7BF5]"
                style={linkStyle(isActive(link.hash))}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="font-display transition-colors duration-200 hover:!text-[#4B7BF5]"
              style={linkStyle(isBlogActive)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 text-center transition-all duration-200 hover:!bg-[#4B7BF5] hover:!border-[#4B7BF5]"
              style={{
                border: '1px solid rgba(240,237,232,0.4)',
                color: '#F0EDE8',
                borderRadius: '100px',
                padding: '12px 28px',
                fontSize: '14px',
                background: 'transparent',
                fontFamily: 'var(--font-body)',
              }}
            >
              Première analyse
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
