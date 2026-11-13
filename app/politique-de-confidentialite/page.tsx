import type { Metadata } from 'next'
import ManageCookiesButton from '@/components/consent/ManageCookiesButton'
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
          Dernière mise à jour : 13 novembre 2026
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
          Via les formulaires du site (contact, rendez-vous, démonstration) : nom, e-mail, téléphone,
          société, message.
          <br />
          Via le diagnostic : les mêmes informations de contact, ainsi que vos réponses au questionnaire.
          <br />
          Mesure d&apos;audience : uniquement si vous l&apos;acceptez (voir la section Cookies).
        </p>

        <h2>3. Finalité du traitement</h2>
        <p>
          Répondre à votre demande et vous recontacter. Avec votre consentement, mesurer
          l&apos;audience du site pour l&apos;améliorer.
        </p>

        <h2>4. Base légale</h2>
        <p>
          Consentement explicite (Article 6.1.a RGPD) et intérêt légitime (Article 6.1.f RGPD).
        </p>

        <h2>5. Durée de conservation</h2>
        <p>
          Demandes de contact : 3 ans à compter du dernier contact.
        </p>

        <h2>6. Destinataires et sous-traitants</h2>
        <p>
          Vos données sont strictement confidentielles, jamais vendues ni partagées. Elles sont
          traitées uniquement par les prestataires techniques nécessaires au fonctionnement du site :
        </p>
        <ul>
          <li>Vercel : hébergement du site ;</li>
          <li>Resend : envoi des e-mails ;</li>
          <li>Cloudflare Turnstile : protection des formulaires contre le spam ;</li>
          <li>Google Analytics : mesure d&apos;audience, uniquement avec votre consentement.</li>
        </ul>

        <h2>7. Transferts hors de l&apos;Union européenne</h2>
        {/* TODO: vérifier le mécanisme de transfert de chaque prestataire
            (Vercel, Resend, Google : certification Data Privacy Framework ou clauses contractuelles types) */}
        <p>
          Certains de nos prestataires (Vercel, Resend, Google) sont établis aux États-Unis. Ces
          transferts sont encadrés par les garanties prévues par le RGPD : Data Privacy Framework
          UE–États-Unis ou clauses contractuelles types de la Commission européenne.
        </p>

        <h2 id="cookies">8. Cookies</h2>
        <p>Le site dépose les cookies suivants :</p>
        <ul>
          <li>
            <strong>kls3_consent</strong> : mémorise votre choix sur les cookies. Durée : 6 mois.
            Nécessaire au fonctionnement du site.
          </li>
          <li>
            <strong>_ga, _ga_*</strong> (Google Analytics) : mesure d&apos;audience. Durée : 13 mois
            maximum. Déposés uniquement avec votre consentement.
          </li>
        </ul>
        <p>
          Vous pouvez retirer ou modifier votre consentement à tout moment :{' '}
          <ManageCookiesButton className={b.inlinebutton} />. Le lien « Gérer les cookies » est aussi
          disponible en bas de chaque page.
        </p>

        <h2>9. Vos droits</h2>
        <p>
          Droit d&apos;accès, rectification, effacement, limitation, opposition, portabilité.
          <br />
          Contact : contact@kls3-dev.com
        </p>

        <h2>10. Réclamation</h2>
        <p>
          Vous pouvez introduire une réclamation auprès de la CNIL : 3 Place de Fontenoy - TSA 80715 -
          75334 PARIS CEDEX 07 — www.cnil.fr
        </p>

        <h2>11. Sécurité</h2>
        <p>
          Mesures techniques et organisationnelles appropriées pour garantir la sécurité des données.
        </p>

        <h2>12. Modifications</h2>
        <p>
          Nous nous réservons le droit de modifier cette politique à tout moment.
        </p>
      </div>
    </div>
  )
}
