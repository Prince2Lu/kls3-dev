import type { Metadata } from 'next'
import s from '@/components/home/home.module.css'
import b from '@/components/blog/blog.module.css'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(
  'Politique de confidentialité',
  'Politique de confidentialité du site kls3-dev.com',
  { path: '/politique-de-confidentialite' }
)

export default function PolitiqueConfidentialite() {
  return (
    <div className={`${s.root} ${b.scope}`}>
      <div className={`${s.wrap} ${b.legal}`}>
        <h1>Politique de confidentialité</h1>

        <p className={b.updated}>
          Dernière mise à jour : 23 juin 2026
        </p>
        <p>
          KLS3 accorde une grande importance à la protection de vos données personnelles.
        </p>

        <h2>1. Responsable du traitement</h2>
        <p>
          KLS3 — 14, allée du fairway, 57200 Sarreguemines — contact@kls3-dev.com
        </p>

        <h2>2. Données collectées</h2>
        <p>
          Formulaire de contact : nom, email, entreprise (facultatif), message.
          <br />
          Aucune donnée de tracking, pas de cookies publicitaires.
        </p>

        <h2>3. Finalité du traitement</h2>
        <p>
          Répondre aux demandes de contact, fournir des informations sur nos services, établir une
          relation commerciale.
        </p>

        <h2>4. Base légale</h2>
        <p>
          Consentement explicite (Article 6.1.a RGPD) et intérêt légitime (Article 6.1.f RGPD).
        </p>

        <h2>5. Durée de conservation</h2>
        <p>
          Durée nécessaire au traitement, puis archivage 3 ans maximum.
        </p>

        <h2>6. Destinataires</h2>
        <p>
          Données strictement confidentielles, jamais vendues ni partagées.
        </p>

        <h2>7. Vos droits</h2>
        <p>
          Droit d&apos;accès, rectification, effacement, limitation, opposition, portabilité.
          <br />
          Contact : contact@kls3-dev.com
        </p>

        <h2>8. Réclamation</h2>
        <p>
          CNIL - 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07 — www.cnil.fr
        </p>

        <h2>9. Sécurité</h2>
        <p>
          Mesures techniques et organisationnelles appropriées pour garantir la sécurité des données.
        </p>

        <h2>10. Modifications</h2>
        <p>
          Nous nous réservons le droit de modifier cette politique à tout moment.
        </p>
      </div>
    </div>
  )
}
