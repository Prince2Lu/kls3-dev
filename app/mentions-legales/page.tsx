import type { Metadata } from 'next'
import Link from 'next/link'
import s from '@/components/home/home.module.css'
import b from '@/components/blog/blog.module.css'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(
  'Mentions légales',
  'Mentions légales du site kls3-dev.com',
  { path: '/mentions-legales' }
)

export default function MentionsLegales() {
  return (
    <div className={`${s.root} ${b.scope}`}>
      <div className={`${s.wrap} ${b.legal}`}>
        <h1>Mentions légales</h1>

        <h2>Éditeur du site</h2>
        <p>
          KLS3
          <br />
          SAS au capital de 1 000 €
          <br />
          RCS Sarreguemines 949 563 340
          <br />
          SIRET : 94956334000015
          <br />
          N° TVA intracommunautaire : FR46949563340
          <br />
          Siège social : 14, allée du fairway, 57200 Sarreguemines
          <br />
          Email : contact@kls3-dev.com
        </p>

        <h2>Directeur de la publication</h2>
        <p>Eric Scarpino</p>

        <h2>Hébergement</h2>
        <p>
          Ce site est hébergé par Vercel Inc.
          <br />
          340 S Lemon Ave #4133
          <br />
          Walnut, CA 91789, États-Unis
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriété
          exclusive de KLS3, sauf mention contraire. Toute reproduction, distribution, modification,
          adaptation, retransmission ou publication de ces différents éléments est strictement
          interdite sans l&apos;accord écrit de KLS3.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
          d&apos;un droit d&apos;accès, de rectification et de suppression des données vous concernant.
          Pour exercer ce droit, contactez-nous à : contact@kls3-dev.com
        </p>

        <h2>Cookies</h2>
        <p>
          Le site utilise des cookies de mesure d&apos;audience (Google Analytics), déposés
          uniquement avec votre consentement. Voir la{' '}
          <Link href="/politique-de-confidentialite#cookies">politique de confidentialité</Link>.
        </p>

        <h2>Responsabilité</h2>
        <p>
          KLS3 s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations
          diffusées sur ce site. Toutefois, KLS3 ne peut garantir l&apos;exactitude, la précision ou
          l&apos;exhaustivité des informations mises à disposition sur ce site.
        </p>
      </div>
    </div>
  )
}
