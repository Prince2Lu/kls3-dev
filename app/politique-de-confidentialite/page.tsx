import type { Metadata } from 'next'
import { legalH1Style, legalH2Style, legalMainStyle, legalPStyle } from '@/lib/legalPageStyles'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(
  'Politique de confidentialité | KLS3',
  'Politique de confidentialité du site kls3-dev.com',
  { path: '/politique-de-confidentialite' }
)

export default function PolitiqueConfidentialite() {
  return (
    <main style={legalMainStyle}>
      <h1 style={legalH1Style}>Politique de confidentialité</h1>

      <p style={{ ...legalPStyle, marginBottom: 24, color: 'rgba(240,237,232,0.45)' }}>
        Dernière mise à jour : 23 juin 2026
      </p>
      <p style={{ ...legalPStyle, marginBottom: 8 }}>
        KLS3 accorde une grande importance à la protection de vos données personnelles.
      </p>

      <h2 style={legalH2Style}>1. Responsable du traitement</h2>
      <p style={legalPStyle}>
        KLS3 — 14, allée du fairway, 57200 Sarreguemines — contact@kls3-dev.com
      </p>

      <h2 style={legalH2Style}>2. Données collectées</h2>
      <p style={legalPStyle}>
        Formulaire de contact : nom, email, entreprise (facultatif), message.
        <br />
        Aucune donnée de tracking, pas de cookies publicitaires.
      </p>

      <h2 style={legalH2Style}>3. Finalité du traitement</h2>
      <p style={legalPStyle}>
        Répondre aux demandes de contact, fournir des informations sur nos services, établir une
        relation commerciale.
      </p>

      <h2 style={legalH2Style}>4. Base légale</h2>
      <p style={legalPStyle}>
        Consentement explicite (Article 6.1.a RGPD) et intérêt légitime (Article 6.1.f RGPD).
      </p>

      <h2 style={legalH2Style}>5. Durée de conservation</h2>
      <p style={legalPStyle}>
        Durée nécessaire au traitement, puis archivage 3 ans maximum.
      </p>

      <h2 style={legalH2Style}>6. Destinataires</h2>
      <p style={legalPStyle}>
        Données strictement confidentielles, jamais vendues ni partagées.
      </p>

      <h2 style={legalH2Style}>7. Vos droits</h2>
      <p style={legalPStyle}>
        Droit d&apos;accès, rectification, effacement, limitation, opposition, portabilité.
        <br />
        Contact : contact@kls3-dev.com
      </p>

      <h2 style={legalH2Style}>8. Réclamation</h2>
      <p style={legalPStyle}>
        CNIL - 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07 — www.cnil.fr
      </p>

      <h2 style={legalH2Style}>9. Sécurité</h2>
      <p style={legalPStyle}>
        Mesures techniques et organisationnelles appropriées pour garantir la sécurité des données.
      </p>

      <h2 style={legalH2Style}>10. Modifications</h2>
      <p style={legalPStyle}>
        Nous nous réservons le droit de modifier cette politique à tout moment.
      </p>
    </main>
  )
}
