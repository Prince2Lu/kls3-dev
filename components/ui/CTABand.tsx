'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import GlassCard from './GlassCard'

interface CTABandProps {
  title: string
  description?: string
  subtitle?: string
  ctaText: string
  ctaHref: string
}

export default function CTABand({ title, description, subtitle, ctaText, ctaHref }: CTABandProps) {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard accent="purple" className="p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{title}</h2>
              {description && <p className="text-foreground/70 text-lg mb-2">{description}</p>}
              {subtitle && <p className="text-foreground/50 text-sm">{subtitle}</p>}
            </div>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-purple to-brand-cyan text-white rounded-full font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  )
}
