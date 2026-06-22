'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import BlogCard from '@/components/ui/BlogCard'
import SectionLabel from '@/components/ui/SectionLabel'
import { type BlogPost } from '@/lib/mdx'

interface BlogPreviewProps {
  posts: BlogPost[]
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const latestPosts = posts.slice(0, 3)

  if (latestPosts.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-dark-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <SectionLabel className="mb-4">Blog</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Derniers articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-brand-purple-light hover:text-brand-purple transition-colors font-medium"
          >
            Voir tous les articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="sm:hidden text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-purple-light hover:text-brand-purple transition-colors font-medium"
          >
            Voir tous les articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
