'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import GlassCard from '@/components/ui/GlassCard'
import { Clock, FileSearch, Lightbulb } from 'lucide-react'

const problems = [
  {
    icon: Clock,
    title: 'Nos projets prennent du retard',
    description: 'Pas de pilotage structuré, des réunions sans compte-rendu, des équipes qui avancent chacune de leur côté. Le projet dérive, les délais glissent, tout le monde s\'épuise.',
  },
  {
    icon: FileSearch,
    title: 'On perd un temps fou sur des tâches sans valeur',
    description: 'Saisies manuelles, relances par email, documents dispersés sur 5 outils différents. Vos collaborateurs sont des experts — ils ne devraient pas passer leur journée à chercher des informations.',
  },
  {
    icon: Lightbulb,
    title: 'On a une idée d\'outil mais on ne sait pas par où commencer',
    description: 'Un besoin métier identifié, mais pas les ressources internes pour le développer. Le projet reste dans un coin d\'un slide PowerPoint depuis 18 mois.',
  },
]

export default function Problems() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <SectionLabel className="mb-4">CE QUE NOS CLIENTS VIVENT</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Vous reconnaissez-vous ?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard accent="purple" className="p-6 h-full">
                  <div className="w-12 h-12 rounded-lg bg-brand-purple/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-purple" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {problem.description}
                  </p>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-xl text-foreground/80 font-medium">
            KLS<span style={{ color: '#4B7BF5' }}>3</span> intervient exactement là où ces problèmes se posent.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
