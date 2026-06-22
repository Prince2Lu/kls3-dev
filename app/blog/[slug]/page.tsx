import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import GlassCard from '@/components/ui/GlassCard'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Article non trouvé',
    }
  }

  return {
    title: post.titre_seo,
    description: post.meta_description,
    openGraph: {
      title: post.titre_seo,
      description: post.meta_description,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

const categoryColors: Record<string, string> = {
  'Intelligence artificielle': 'text-brand-cyan-light',
  'Gestion de projet': 'text-brand-purple-light',
  'SaaS': 'text-brand-green-light',
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>
      </div>

      {/* Article header */}
      <article className="py-12 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <header className="mb-12">
            <p className={`text-sm uppercase tracking-wider font-medium mb-4 ${categoryColors[post.categorie] || 'text-brand-purple-light'}`}>
              {post.categorie}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.titre_seo}
            </h1>
            <p className="text-xl text-foreground/70 mb-6 leading-relaxed">{post.meta_description}</p>
            <div className="flex items-center gap-6 text-sm text-foreground/50">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} min de lecture
              </span>
            </div>
          </header>

          {/* Article content */}
          <GlassCard className="p-8 md:p-12">
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-bold
              prose-p:text-foreground/80 prose-p:leading-relaxed
              prose-a:text-brand-cyan prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:text-foreground/80 prose-ol:text-foreground/80
              prose-li:marker:text-brand-purple
              prose-code:text-brand-cyan-light prose-code:bg-dark-surface prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-dark-surface prose-pre:border prose-pre:border-dark-border
            ">
              <MDXRemote source={post.content} />
            </div>
          </GlassCard>

          {/* Back to blog link */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-brand-purple-light hover:text-brand-purple transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Voir tous les articles
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
