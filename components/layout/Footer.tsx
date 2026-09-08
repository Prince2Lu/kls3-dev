import Image from 'next/image'
import Link from 'next/link'
import { pageContentStyle } from '@/lib/pageLayout'

const mainLinkStyle = {
  fontSize: '13px',
  color: 'rgba(240, 237, 232, 0.65)',
} as const

const legalLinkStyle = {
  fontSize: 12,
  color: 'rgba(240,237,232,0.45)',
} as const

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#0D0D0D',
        borderTop: '0.5px solid rgba(255, 255, 255, 0.07)',
      }}
    >
      <div style={{ ...pageContentStyle, paddingTop: 48, paddingBottom: 48 }}>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <Link href="/" aria-label="KLS3 — Accueil">
            <Image src="/logo.png" alt="KLS3" width={90} height={26} />
          </Link>

          <div className="flex flex-col gap-6">
            <nav className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
              <Link
                href="/blog"
                className="transition-colors hover:text-[#F0EDE8]"
                style={mainLinkStyle}
              >
                Blog
              </Link>
              <Link
                href="/a-propos"
                className="transition-colors hover:text-[#F0EDE8]"
                style={mainLinkStyle}
              >
                À propos
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-[#F0EDE8]"
                style={mainLinkStyle}
              >
                Contact
              </Link>
            </nav>

            <nav className="flex flex-wrap items-center gap-3">
              <Link
                href="/mentions-legales"
                className="transition-colors hover:!text-[rgba(240,237,232,0.65)]"
                style={legalLinkStyle}
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-de-confidentialite"
                className="transition-colors hover:!text-[rgba(240,237,232,0.65)]"
                style={legalLinkStyle}
              >
                Politique de confidentialité
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-6" style={{ borderTop: '0.5px solid rgba(255, 255, 255, 0.07)' }}>
          <p style={{ fontSize: '12px', color: 'rgba(240, 237, 232, 0.65)' }}>© 2026 KLS3 · Grand-Est & Luxembourg</p>
        </div>
      </div>
    </footer>
  )
}
