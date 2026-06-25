'use client'

import Image from 'next/image'
import Link from 'next/link'
import { type BlogPost } from '@/lib/blog'

interface BlogPreviewCardProps {
  post: BlogPost
}

export default function BlogPreviewCard({ post }: BlogPreviewCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: '#111111',
          border: '0.5px solid rgba(255,255,255,0.07)',
          borderRadius: 14,
          padding: '28px 24px',
          height: '100%',
          transition: 'border-color 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(75,123,245,0.35)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        }}
      >
        {post.image && (
          <div
            className="relative mb-5 h-40 w-full overflow-hidden rounded-[10px] md:h-[180px]"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}
        {post.categorie && (
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#4B7BF5',
              marginBottom: 14,
              opacity: 0.8,
            }}
          >
            {post.categorie}
          </div>
        )}
        <h3
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 600,
            fontSize: 17,
            color: '#F0EDE8',
            margin: '0 0 12px',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}
        >
          {post.title}
        </h3>
        {post.description && (
          <p
            style={{
              fontSize: 13,
              color: 'rgba(240,237,232,0.45)',
              lineHeight: 1.6,
              margin: '0 0 20px',
              fontWeight: 300,
            }}
          >
            {post.description}
          </p>
        )}
        <div
          style={{
            fontSize: 12,
            color: 'rgba(240,237,232,0.25)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>
            {post.date
              ? new Date(post.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : ''}
          </span>
          <span style={{ color: '#4B7BF5', fontSize: 14 }}>→</span>
        </div>
      </div>
    </Link>
  )
}
