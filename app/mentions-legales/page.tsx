import type { Metadata } from 'next'
import GlassCard from '@/components/ui/GlassCard'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site kls3.dev',
}

export default function MentionsLegalesPage() {
  return (
    <section className="relative py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
          Mentions <span className="gradient-text">légales</span>
        </h1>

        <GlassCard className="p-8 md:p-12">
          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Éditeur du site</h2>
              <p>
                KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span><br />
                SAS<br />
                SIRET : 94956334000015<br />
                Siège social : 14, allée du fairway, 57200 Sarreguemines
              </p>
              <p className="mt-4">
                Email : <a href="mailto:contact@kls3-dev.com" className="text-brand-cyan hover:underline">contact@kls3-dev.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Directeur de la publication</h2>
              <p>Eric Scarpino</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Hébergement</h2>
              <p>
                Ce site est hébergé par Vercel Inc.<br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789, États-Unis
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriété exclusive de KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span>, sauf mention contraire.
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments est strictement interdite sans l'accord écrit de KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Données personnelles</h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.
                Pour exercer ce droit, contactez-nous à l'adresse : <a href="mailto:contact@kls3-dev.com" className="text-brand-cyan hover:underline">contact@kls3-dev.com</a>
              </p>
              <p className="mt-4">
                Pour plus d'informations, consultez notre <a href="/politique-de-confidentialite" className="text-brand-cyan hover:underline">politique de confidentialité</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Cookies</h2>
              <p>
                Ce site n'utilise pas de cookies de tracking ou de publicité.
                Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être utilisés.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Responsabilité</h2>
              <p>
                KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span> s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site.
                Toutefois, KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span> ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
              </p>
              <p className="mt-4">
                KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span> décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.
              </p>
            </section>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
