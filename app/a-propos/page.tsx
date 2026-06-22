import type { Metadata } from 'next'
import { Target, TrendingUp, Shield, User, Briefcase } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import SectionLabel from '@/components/ui/SectionLabel'
import CTABand from '@/components/ui/CTABand'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'KLS3, votre partenaire digital de confiance. Gestion de projet, transformation digitale et développement de solutions SaaS pour professionnels exigeants.',
}

const team = [
  {
    name: 'Éric',
    role: 'Fondateur & Directeur de missions',
    icon: Briefcase,
    description: '20+ ans d\'expérience en gestion de projet et transformation digitale. Missions en France, Allemagne, Luxembourg et Belgique pour des structures allant de la startup au grand groupe.',
  },
  {
    name: 'Lilian',
    role: 'Directeur Commercial',
    icon: User,
    description: 'En charge du développement commercial et de la relation client. Interlocuteur privilégié pour les premiers échanges et la définition de vos besoins.',
  },
]

const values = [
  {
    icon: Target,
    title: 'Clarté avant tout',
    description: 'Nous disons ce que nous faisons, et nous faisons ce que nous disons. Pas de jargon inutile, pas de promesses sans fondement.',
  },
  {
    icon: TrendingUp,
    title: 'Orientation résultats',
    description: 'Chaque mission commence par la définition d\'objectifs mesurables. C\'est ce qui nous permet d\'évaluer ensemble si nous avons réussi.',
  },
  {
    icon: Shield,
    title: 'Confidentialité absolue',
    description: 'Nous intervenons dans des environnements où la confidentialité est critique. NDA systématique, données sécurisées, discrétion garantie.',
  },
]

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24">
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span>, votre partenaire digital de <span className="gradient-text">confiance</span>.
          </h1>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <GlassCard className="p-8 md:p-12">
            <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
              <p>
                KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span> est née d'un constat simple : les cabinets et structures professionnelles à forte valeur ajoutée méritent des outils et une expertise à leur niveau — sans les lourdeurs et les coûts des grandes SSII.
              </p>
              <p>
                Nous avons fondé KLS<span style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3</span> avec une conviction : le digital, bien utilisé, est un levier de performance extraordinaire pour les professionnels du droit, de la finance et du conseil. Mais seulement s'il est pensé pour leur réalité métier, pas plaqué dessus.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* L'équipe */}
      <section className="py-20 bg-dark-surface/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionLabel className="mb-4">L'ÉQUIPE</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Qui sommes-nous ?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {team.map((member) => {
              const Icon = member.icon
              return (
                <GlassCard key={member.name} accent="purple" className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-brand-purple" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{member.name}</h3>
                      <p className="text-brand-purple-light font-medium">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-foreground/70 leading-relaxed">{member.description}</p>
                </GlassCard>
              )
            })}
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-foreground/60 italic">
              Selon les missions, nous mobilisons un réseau d'experts spécialisés — chaque projet bénéficie des compétences exactement adaptées à ses enjeux.
            </p>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionLabel className="mb-4">NOS VALEURS</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ce qui nous guide
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <GlassCard key={value.title} className="p-8 text-center">
                  <div className="w-14 h-14 rounded-lg bg-brand-cyan/10 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-7 h-7 text-brand-cyan" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{value.description}</p>
                </GlassCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <CTABand
          title="Faisons connaissance"
          description="Premier échange gratuit et sans engagement."
          ctaText="Prendre rendez-vous"
          ctaHref="/contact"
        />
      </div>
    </>
  )
}
