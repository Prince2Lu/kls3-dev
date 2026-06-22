import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-dark-border-subtle bg-dark-bg/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <img src="/logo.svg" alt="KLS3" width={31} height={31} />
              <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '20px', fontWeight: 600, letterSpacing: '-0.5px', color: 'rgba(255,255,255,0.6)' }}>
                KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>3</span>
              </span>
            </Link>
            <p className="text-foreground/60 text-sm max-w-md">
              KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span> — Gestion de projet · Transformation digitale · Solutions SaaS
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-foreground font-medium mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/gestion-de-projet" className="text-foreground/60 hover:text-foreground transition-colors">
                  Gestion de projet
                </Link>
              </li>
              <li>
                <Link href="/transformation-digitale" className="text-foreground/60 hover:text-foreground transition-colors">
                  Transformation digitale
                </Link>
              </li>
              <li>
                <Link href="/solutions-saas" className="text-foreground/60 hover:text-foreground transition-colors">
                  Solutions SaaS
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-medium mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="text-foreground/60 hover:text-foreground transition-colors">
                  Prendre rendez-vous
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-foreground/60 hover:text-foreground transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-foreground/60 hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-dark-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
            <p className="text-foreground/50">
              © {currentYear} KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span>. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/mentions-legales" className="text-foreground/50 hover:text-foreground transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-de-confidentialite" className="text-foreground/50 hover:text-foreground transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:contact@kls3-dev.com"
              className="text-foreground/50 hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
