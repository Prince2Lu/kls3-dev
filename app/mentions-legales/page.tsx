import type { Metadata } from 'next'
import { legalH1Style, legalH2Style, legalMainStyle, legalPStyle } from '@/lib/legalPageStyles'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(
  'Mentions légales | KLS3',
  'Mentions légales du site kls3-dev.com',
  { path: '/mentions-legales' }
)

export default function MentionsLegales() {
  return (
    <main style={legalMainStyle}>
      <h1 style={legalH1Style}>Mentions légales</h1>

      <h2 style={legalH2Style}>Éditeur du site</h2>
      <p style={legalPStyle}>
        KLS3
        <br />
        SAS
        <br />
        SIRET : 94956334000015
        <br />
        Siège social : 14, allée du fairway, 57200 Sarreguemines
        <br />
        Email : contact@kls3-dev.com
      </p>

      <h2 style={legalH2Style}>Directeur de la publication</h2>
      <p style={legalPStyle}>Eric Scarpino</p>

      <h2 style={legalH2Style}>Hébergement</h2>
      <p style={legalPStyle}>
        Ce site est hébergé par Vercel Inc.
        <br />
        340 S Lemon Ave #4133
        <br />
        Walnut, CA 91789, États-Unis
      </p>

      <h2 style={legalH2Style}>Propriété intellectuelle</h2>
      <p style={legalPStyle}>
        L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriété
        exclusive de KLS3, sauf mention contraire. Toute reproduction, distribution, modification,
        adaptation, retransmission ou publication de ces différents éléments est strictement
        interdite sans l&apos;accord écrit de KLS3.
      </p>

      <h2 style={legalH2Style}>Données personnelles</h2>
      <p style={legalPStyle}>
        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
        d&apos;un droit d&apos;accès, de rectification et de suppression des données vous concernant.
        Pour exercer ce droit, contactez-nous à : contact@kls3-dev.com
      </p>

      <h2 style={legalH2Style}>Cookies</h2>
      <p style={legalPStyle}>
        Ce site n&apos;utilise pas de cookies de tracking ou de publicité. Seuls des cookies
        techniques strictement nécessaires au fonctionnement du site peuvent être utilisés.
      </p>

      <h2 style={legalH2Style}>Responsabilité</h2>
      <p style={legalPStyle}>
        KLS3 s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations
        diffusées sur ce site. Toutefois, KLS3 ne peut garantir l&apos;exactitude, la précision ou
        l&apos;exhaustivité des informations mises à disposition sur ce site.
      </p>
    </main>
  )
}
