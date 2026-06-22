'use client'

import { motion } from 'framer-motion'
import PillarCard from '@/components/ui/PillarCard'
import SectionLabel from '@/components/ui/SectionLabel'
import { pillars } from '@/lib/data'

export default function Pillars() {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <SectionLabel className="mb-4">NOS SERVICES</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trois expertises, un seul interlocuteur.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  )
}
