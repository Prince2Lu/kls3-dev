'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import GradientBadge from '@/components/ui/GradientBadge'
import ConvCarousel from '@/components/ui/ConvCarousel'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <GradientBadge showPulse>
                Disponible pour nouvelles missions
              </GradientBadge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-[4rem] font-bold text-foreground mb-6 leading-[1.1]"
            >
              Vos projets méritent mieux qu'une <span className="gradient-text">gestion approximative</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-foreground/70 mb-10 leading-relaxed max-w-xl"
            >
              KLS<span style={{ color: '#4B7BF5' }}>3</span> accompagne les cabinets d'avocats, experts-comptables et sociétés de corporate services pour structurer leurs projets, moderniser leurs outils et développer leurs solutions digitales avec méthode, clarté et expertise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-12"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-purple to-brand-cyan text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Parlons de votre projet
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 px-8 py-4 border border-dark-border bg-white/[0.08] text-foreground rounded-lg font-medium hover:bg-white/[0.12] transition-colors"
                style={{ backdropFilter: 'blur(8px)' }}
              >
                <Sparkles className="w-5 h-5" />
                Découvrir nos services
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-8"
            >
              <div>
                <p className="text-4xl font-bold text-brand-green mb-1">20+</p>
                <p className="text-sm text-foreground/60">ans d'expérience</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-brand-green mb-1">30+</p>
                <p className="text-sm text-foreground/60">projets livrés</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-brand-green mb-1">4</p>
                <p className="text-sm text-foreground/60">pays clients</p>
              </div>
            </motion.div>
          </div>

          {/* Right column - AI Conversations Carousel */}
          <div className="hidden lg:flex items-center justify-center">
            <ConvCarousel />
          </div>
        </div>
      </div>
    </section>
  )
}
