import type { Metadata } from 'next'
import GlassCard from '@/components/ui/GlassCard'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et protection des données de kls3.dev',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="relative py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
          Politique de <span className="gradient-text">confidentialité</span>
        </h1>

        <GlassCard className="p-8 md:p-12">
          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <p className="text-foreground/60 italic mb-6">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p>
                KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span> accorde une grande importance à la protection de vos données personnelles.
                Cette politique de confidentialité explique quelles données nous collectons, pourquoi nous les collectons, et comment nous les utilisons.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Responsable du traitement</h2>
              <p>
                Le responsable du traitement des données est :<br />
                KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span><br />
                14, allée du fairway, 57200 Sarreguemines<br />
                Email : <a href="mailto:contact@kls3-dev.com" className="text-brand-cyan hover:underline">contact@kls3-dev.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Données collectées</h2>
              <p className="mb-4">
                Lorsque vous utilisez le formulaire de contact, nous collectons les informations suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Votre nom et prénom</li>
                <li>Votre adresse email</li>
                <li>Votre entreprise (facultatif)</li>
                <li>Le contenu de votre message</li>
              </ul>
              <p className="mt-4">
                Nous ne collectons aucune donnée de navigation, de tracking ou de profilage publicitaire.
                Ce site n'utilise pas de cookies de tracking.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Finalité du traitement</h2>
              <p className="mb-4">
                Vos données sont collectées uniquement pour :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Répondre à vos demandes de contact</li>
                <li>Vous fournir les informations demandées sur nos services</li>
                <li>Établir une relation commerciale si vous le souhaitez</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Base légale</h2>
              <p>
                Le traitement de vos données repose sur votre consentement explicite lors de l'envoi du formulaire de contact
                (Article 6.1.a du RGPD) et sur l'intérêt légitime de KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span> à répondre aux demandes entrantes (Article 6.1.f du RGPD).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Durée de conservation</h2>
              <p>
                Vos données sont conservées pendant la durée nécessaire au traitement de votre demande,
                puis archivées pour une durée maximale de 3 ans à des fins de preuve en cas de litige.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Destinataires des données</h2>
              <p>
                Vos données sont strictement confidentielles et destinées uniquement à KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span>.
                Elles ne sont jamais vendues, louées ou partagées avec des tiers à des fins commerciales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Vos droits</h2>
              <p className="mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
                <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
                <li><strong>Droit à l'effacement</strong> : supprimer vos données ("droit à l'oubli")</li>
                <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
                <li><strong>Droit d'opposition</strong> : vous opposer au traitement</li>
                <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format structuré</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@kls3-dev.com" className="text-brand-cyan hover:underline">contact@kls3-dev.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Réclamation</h2>
              <p>
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
              </p>
              <p className="mt-2">
                CNIL - 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07<br />
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">www.cnil.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Sécurité</h2>
              <p>
                KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span> met en œuvre toutes les mesures techniques et organisationnelles appropriées pour garantir la sécurité et la confidentialité de vos données,
                notamment pour empêcher qu'elles soient déformées, endommagées ou que des tiers non autorisés y aient accès.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Modifications</h2>
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
                La version en vigueur est celle publiée sur cette page. Toute modification substantielle vous sera notifiée.
              </p>
            </section>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
