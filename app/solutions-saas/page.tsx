import type { Metadata } from 'next'
import { CheckCircle2, Users, Lock, Code, Sparkles, LifeBuoy } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import SectionLabel from '@/components/ui/SectionLabel'
import CTABand from '@/components/ui/CTABand'

export const metadata: Metadata = {
  title: 'Solutions SaaS',
  description: 'Vous avez identifié un besoin qu\'aucun logiciel du marché ne couvre correctement ? KLS3 conçoit et développe votre solution — robuste, scalable, et maintenue dans le temps.',
}

const offers = [
  {
    name: 'MVP',
    duration: '6 à 8 semaines',
    tag: 'Pour tester votre idée rapidement',
    color: 'purple' as const,
    features: [
      'Spécification fonctionnelle complète',
      'Développement du cœur fonctionnel',
      'Authentification et gestion des utilisateurs',
      'Déploiement en production',
      '30 jours de support post-lancement',
    ],
  },
  {
    name: 'Solution complète',
    duration: '3 à 6 mois',
    tag: 'Pour un produit robuste et scalable',
    color: 'green' as const,
    features: [
      'Tout le MVP, plus :',
      'Fonctionnalités avancées et intégrations',
      'Tableau de bord d\'administration',
      'Stripe (abonnements ou paiements)',
      'Documentation technique et utilisateur',
      'Accompagnement au lancement',
    ],
  },
]

export default function SolutionsSaaSPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24">
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <SectionLabel className="mb-4">Pilier 3</SectionLabel>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Votre outil métier sur mesure, <span className="gradient-text">de l'idée au lancement</span>.
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto mb-8">
            Vous avez identifié un besoin qu'aucun logiciel du marché ne couvre correctement ? KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span> conçoit et développe votre solution — robuste, scalable, et maintenue dans le temps.
          </p>
          <div className="max-w-3xl mx-auto">
            <GlassCard className="p-6 text-left">
              <p className="text-foreground/80 leading-relaxed">
                Entre les outils génériques qui ne correspondent pas à votre métier et le développement sur mesure trop coûteux et trop long, il existe une troisième voie. Des solutions construites spécifiquement pour votre cas d'usage, avec une stack moderne, un budget maîtrisé et des délais réalistes.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Offres packagées */}
      <section className="py-20 bg-dark-surface/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Deux offres packagées
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {offers.map((offer) => (
              <GlassCard key={offer.name} accent={offer.color} className="p-8">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-foreground mb-2">{offer.name}</h3>
                  <p className="text-brand-green font-semibold text-lg mb-3">{offer.duration}</p>
                  <p className="text-foreground/70 text-sm italic">{offer.tag}</p>
                </div>
                <ul className="space-y-4">
                  {offer.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {feature.startsWith('Tout le MVP') ? (
                        <span className="text-foreground/90 font-medium">{feature}</span>
                      ) : (
                        <>
                          <CheckCircle2 className={`w-5 h-5 text-brand-${offer.color} flex-shrink-0 mt-0.5`} />
                          <span className="text-foreground/80">{feature}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <CTABand
          title="Concrétisons votre projet"
          description="Échange découverte gratuit et sans engagement."
          ctaText="Prendre rendez-vous"
          ctaHref="/contact"
        />
      </div>
    </>
  )
}
