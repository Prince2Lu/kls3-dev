'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import GlassCard from './GlassCard'
import { type Pillar } from '@/lib/types'

interface PillarCardProps {
  pillar: Pillar
}

export default function PillarCard({ pillar }: PillarCardProps) {
  const Icon = Icons[pillar.icon as keyof typeof Icons] as Icons.LucideIcon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={pillar.href}>
        <GlassCard accent={pillar.color} className="p-8 hover:scale-[1.02] transition-transform duration-300 h-full">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              {Icon && <Icon className={`w-8 h-8 text-brand-${pillar.color}`} />}
              <span className="text-xs px-3 py-1 rounded-full bg-dark-surface border border-dark-border-subtle text-foreground/70">
                {pillar.tag}
              </span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-brand-purple-light mb-2 font-medium">
                {pillar.label}
              </p>
              <h3 className="text-2xl font-bold text-foreground mb-3">{pillar.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{pillar.description}</p>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  )
}
