'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { type BlogListingPost } from '@/lib/mdx'

interface BlogCardProps {
  post: BlogListingPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <article
          className="h-full overflow-hidden rounded-lg transition-colors duration-300 hover:bg-[#161616]"
          style={{ backgroundColor: '#111111', border: '0.5px solid rgba(255,255,255,0.07)' }}
        >
          {post.image && (
            <div className="relative w-full h-48 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt={post.titre_seo} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-6 flex flex-col gap-4">
            <div>
              <p
                className="text-kls-accent"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                {post.categorie}
              </p>
              <h3
                className="text-kls-text line-clamp-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.3,
                  marginBottom: '0.5rem',
                }}
              >
                {post.titre_seo}
              </h3>
              <p
                className="line-clamp-3"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  fontWeight: 300,
                  color: 'rgba(240, 237, 232, 0.6)',
                  lineHeight: 1.6,
                }}
              >
                {post.meta_description}
              </p>
            </div>
            <div
              className="flex items-center gap-4"
              style={{ fontSize: '13px', color: 'rgba(240, 237, 232, 0.45)' }}
            >
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
        </article>
      </Link>
    </motion.div>
  )
}
