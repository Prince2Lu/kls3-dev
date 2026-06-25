import type { Metadata } from 'next'
import { CheckCircle2, Users, Calendar, FileText, BarChart3, Shield } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import SectionLabel from '@/components/ui/SectionLabel'
import CTABand from '@/components/ui/CTABand'

export const metadata: Metadata = {
  title: 'Gestion de projet',
  description: 'KLS3 prend en charge le pilotage opérationnel de vos projets complexes — pour que vous puissiez vous concentrer sur votre cœur de métier.',
}

const deliverables = [
  {
    icon: FileText,
    title: 'Cadrage & planification',
    description: 'Définition du périmètre, des objectifs et des livrables. Roadmap et planning détaillé avec jalons clairs. RACI et matrice de responsabilités.',
  },
  {
    icon: Users,
    title: 'Coordination des équipes',
    description: 'Animation des rituels (comités, points d\'avancement). Gestion des interdépendances entre équipes. Communication structurée vers les parties prenantes.',
  },
  {
    icon: BarChart3,
    title: 'Suivi & reporting',
    description: 'Tableaux de bord de pilotage en temps réel. Alertes proactives sur les dérives. Reporting adapté à chaque niveau de décision.',
  },
  {
    icon: Shield,
    title: 'Gestion des risques',
    description: 'Identification et qualification des risques projet. Plans de mitigation. Gestion des aléas et des changements de périmètre.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Échange découverte',
    description: '30 min pour comprendre votre contexte, vos enjeux et vos contraintes. Gratuit et sans engagement.',
  },
  {
    number: '02',
    title: 'Cadrage',
    description: 'Définition du périmètre, des objectifs mesurables, de la gouvernance et du planning.',
  },
  {
    number: '03',
    title: 'Exécution',
    description: 'Pilotage au quotidien, coordination des équipes, reporting régulier.',
  },
  {
    number: '04',
    title: 'Clôture & transfert',
    description: 'Bilan de mission, documentation, transfert de compétences si nécessaire.',
  },
]

const metrics = [
  { value: '40%', label: 'de gain de temps sur la gestion opérationnelle' },
  { value: '95%', label: 'des projets livrés dans les délais' },
  { value: '30+', label: 'missions en France, Allemagne, Luxembourg et Belgique' },
]

export default function GestionDeProjetPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24">
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <SectionLabel className="mb-4">Pilier 1</SectionLabel>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Vos projets pilotés avec <span className="gradient-text">méthode</span>, de A à Z.
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto mb-8">
            KLS<span style={{ color: '#4B7BF5' }}>3</span> prend en charge le pilotage opérationnel de vos projets complexes — pour que vous puissiez vous concentrer sur votre cœur de métier.
          </p>
          <div className="max-w-3xl mx-auto">
            <GlassCard className="p-6 text-left">
              <p className="text-foreground/80 leading-relaxed">
                Un projet sans pilotage structuré, c'est un projet qui dérive. Délais non tenus, périmètre qui s'élargit, équipes désalignées, parties prenantes frustrées. Ce n'est pas un problème de compétence — c'est un problème d'organisation.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Livrables */}
      <section className="py-20 bg-dark-surface/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ce que nous livrons
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.map((item) => {
              const Icon = item.icon
              return (
                <GlassCard key={item.title} accent="purple" className="p-6">
                  <Icon className="w-8 h-8 text-brand-purple mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{item.description}</p>
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
              <GlassCard key={step.number} className="p-6">
                <div className="text-4xl font-bold text-brand-purple mb-4">{step.number}</div>
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
                <div className="text-5xl font-bold text-brand-green mb-2">{metric.value}</div>
                <p className="text-foreground/70">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <CTABand
          title="Parlons de votre projet"
          description="Échange découverte gratuit et sans engagement."
          ctaText="Prendre rendez-vous"
          ctaHref="/contact"
        />
      </div>
    </>
  )
}
