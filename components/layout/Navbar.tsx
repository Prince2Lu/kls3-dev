'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/gestion-de-projet', label: 'Gestion de projet' },
  { href: '/transformation-digitale', label: 'Transformation digitale' },
  { href: '/solutions-saas', label: 'Solutions SaaS' },
  { href: '/blog', label: 'Blog' },
  { href: '/a-propos', label: 'À propos' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-dark-bg/80 relative">
      {/* Gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-green opacity-60"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="KLS3" width={36} height={36} />
            <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.5px', color: 'white' }}>
              KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>3</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? 'text-foreground' : 'text-foreground/50 hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-gradient-to-r from-brand-purple to-brand-cyan text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Prendre rendez-vous
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-border-subtle">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href) ? 'text-foreground' : 'text-foreground/50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="px-6 py-2.5 bg-gradient-to-r from-brand-purple to-brand-cyan text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
