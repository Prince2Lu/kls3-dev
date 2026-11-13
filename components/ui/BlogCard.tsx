import Image from 'next/image'
import Link from 'next/link'
import { type BlogListingPost } from '@/lib/mdx'
import b from '@/components/blog/blog.module.css'

interface BlogCardProps {
  post: BlogListingPost
  featured?: boolean
}

export function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Carte d'article du blog (design V5)
export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const Title = featured ? 'h2' : 'h3'

  return (
    <Link href={`/blog/${post.slug}`} className={`${b.card} ${featured ? b.featured : ''}`}>
      {post.image && (
        <div className={b.cardimg}>
          <Image
            src={post.image}
            alt={post.titre_seo}
            width={1536}
            height={1024}
            preload={featured}
            sizes={featured ? '(max-width: 760px) 100vw, 640px' : '(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 33vw'}
          />
        </div>
      )}
      <div className={b.cardbody}>
        <p className={b.category}>{post.categorie}</p>
        <Title>{post.titre_seo}</Title>
        <p className={b.excerpt}>{post.meta_description}</p>
        <div className={b.cardfoot}>
          <span className={b.date}>
            {formatPostDate(post.publishedAt)} · {post.readTime} min
          </span>
          <span className={b.more}>Lire l&apos;article →</span>
        </div>
      </div>
    </Link>
  )
}
