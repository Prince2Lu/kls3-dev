'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import GlassCard from './GlassCard'
import { type BlogPost } from '@/lib/mdx'

interface BlogCardProps {
  post: BlogPost
}

const categoryColors: Record<string, string> = {
  'Intelligence artificielle': 'text-brand-cyan-light',
  'Gestion de projet': 'text-brand-purple-light',
  'SaaS': 'text-brand-green-light',
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <GlassCard className="overflow-hidden hover:scale-[1.02] transition-transform duration-300 h-full">
          {post.image && (
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.titre_seo}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex flex-col gap-4">
              <div>
                <p className={`text-xs uppercase tracking-wider font-medium mb-3 ${categoryColors[post.categorie] || 'text-brand-purple-light'}`}>
                  {post.categorie}
                </p>
                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">{post.titre_seo}</h3>
                <p className="text-foreground/70 leading-relaxed line-clamp-3">{post.meta_description}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-foreground/50">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  )
}
