'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { sectors } from '@/lib/data'

export default function Sectors() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <SectionLabel className="mb-4">SECTEURS</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Des expertises sectorielles ciblées.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {sectors.map((sector, index) => (
            <motion.div
              key={sector}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="px-6 py-3 rounded-full border border-dark-border bg-dark-surface text-foreground/80 text-sm font-medium hover:border-brand-purple/50 hover:bg-dark-surface/80 transition-all"
            >
              {sector}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
