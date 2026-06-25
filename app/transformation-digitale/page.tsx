import type { Metadata } from 'next'
import { Scale, Calculator, Building2, CheckCircle2 } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import SectionLabel from '@/components/ui/SectionLabel'
import CTABand from '@/components/ui/CTABand'

export const metadata: Metadata = {
  title: 'Transformation digitale',
  description: 'Audit de processus, déploiement d\'agents IA, automatisation des tâches à faible valeur — KLS3 vous accompagne de l\'analyse à la mise en production.',
}

const useCasesBySector = [
  {
    sector: 'Cabinets d\'avocats',
    icon: Scale,
    color: 'cyan' as const,
    cases: [
      'Agent IA de réponse aux questions clients fréquentes',
      'Analyse automatisée de contrats : identification des clauses à risque',
      'Génération de résumés de dossiers et notes de synthèse',
      'Automatisation de l\'onboarding client (collecte de pièces, KYC)',
    ],
  },
  {
    sector: 'Expertise comptable',
    icon: Calculator,
    color: 'purple' as const,
    cases: [
      'Extraction automatique de données depuis des documents comptables',
      'Génération de rapports clients personnalisés',
      'Agent IA de réponse aux questions fiscales courantes',
      'Automatisation des relances et du suivi dossiers',
    ],
  },
  {
    sector: 'Corporate services',
    icon: Building2,
    color: 'green' as const,
    cases: [
      'Agent IA d\'onboarding des nouvelles sociétés',
      'FAQ interne intelligente pour les équipes',
      'Automatisation du traitement des demandes récurrentes',
      'Tableaux de bord de suivi des mandats en temps réel',
    ],
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Audit',
    description: 'Cartographie de vos processus, identification des tâches automatisables, évaluation du potentiel IA.',
  },
  {
    number: '02',
    title: 'Prototype',
    description: 'Développement d\'un premier agent sur un cas d\'usage prioritaire. Testé avec vos équipes.',
  },
  {
    number: '03',
    title: 'Déploiement',
    description: 'Mise en production, intégration à vos outils existants, sécurisation des données.',
  },
  {
    number: '04',
    title: 'Formation & suivi',
    description: 'Formation de vos équipes, documentation, ajustements sur les 30 premiers jours.',
  },
]

const metrics = [
  { value: '8h/semaine', label: 'économisées en moyenne par collaborateur' },
  { value: '3-6 semaines', label: 'pour déployer le premier agent' },
  { value: '100%', label: 'des solutions livrées avec formation et documentation' },
]

export default function TransformationDigitalePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24">
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <SectionLabel className="mb-4">Pilier 2</SectionLabel>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Modernisez vos outils. <span className="gradient-text">Libérez vos équipes.</span>
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto mb-8">
            Audit de processus, déploiement d'agents IA, automatisation des tâches à faible valeur — KLS<span style={{ color: '#4B7BF5' }}>3</span> vous accompagne de l'analyse à la mise en production.
          </p>
          <div className="max-w-3xl mx-auto">
            <GlassCard className="p-6 text-left">
              <p className="text-foreground/80 leading-relaxed">
                Vos collaborateurs passent des heures sur des tâches répétitives qui pourraient être automatisées. Vos outils ne communiquent pas entre eux. Vous avez entendu parler de l'IA mais vous ne savez pas par où commencer, ni si ça s'applique vraiment à votre métier.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Cas d'usage par secteur */}
      <section className="py-20 bg-dark-surface/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cas d'usage par secteur
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCasesBySector.map((sector) => {
              const Icon = sector.icon
              return (
                <GlassCard key={sector.sector} accent={sector.color} className="p-8">
                  <Icon className={`w-10 h-10 text-brand-${sector.color} mb-4`} />
                  <h3 className="text-2xl font-bold text-foreground mb-6">{sector.sector}</h3>
                  <ul className="space-y-4">
                    {sector.cases.map((useCase, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 text-brand-${sector.color} flex-shrink-0 mt-0.5`} />
                        <span className="text-foreground/80 text-sm leading-relaxed">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Notre process en 4 étapes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <GlassCard key={step.number} accent="cyan" className="p-6">
                <div className="text-4xl font-bold text-brand-cyan mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{step.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 bg-dark-surface/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-brand-green mb-2">{metric.value}</div>
                <p className="text-foreground/70">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <CTABand
          title="Parlons de vos processus"
          description="Échange découverte gratuit et sans engagement."
          ctaText="Prendre rendez-vous"
          ctaHref="/contact"
        />
      </div>
    </>
  )
}
