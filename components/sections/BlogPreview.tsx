import Link from 'next/link'
import BlogPreviewCard from '@/components/ui/BlogPreviewCard'
import { getRecentPosts } from '@/lib/blog'
import { sectionContainerStyle } from '@/lib/pageLayout'

export default function BlogPreview() {
  const posts = getRecentPosts(3)
  if (posts.length === 0) return null

  return (
    <section
      className="border-b border-kls-border"
      style={{ width: '100%', background: '#0D0D0D' }}
    >
      <div style={sectionContainerStyle}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 16,
            fontSize: 12,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#4B7BF5',
            fontWeight: 500,
          }}
        >
          <span style={{ width: 28, height: 1, background: '#4B7BF5', display: 'inline-block' }} />
          Derniers articles
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 40,
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 42px)',
              color: '#F0EDE8',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Ressources opérationnelles
          </h2>
          <Link
            href="/blog"
            style={{
              fontSize: 13,
              color: '#4B7BF5',
              fontWeight: 500,
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              textDecoration: 'none',
            }}
          >
            Voir tous les articles →
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 16,
          }}
        >
          {posts.map((post) => (
            <BlogPreviewCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
