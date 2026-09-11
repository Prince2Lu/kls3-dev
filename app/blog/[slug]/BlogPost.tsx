import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { processArticleHtml, type BlogPost as BlogPostData } from '@/lib/mdx'

const categoryColors: Record<string, string> = {
  'Intelligence artificielle': 'bg-brand-cyan/10 text-brand-cyan-light border-brand-cyan/30',
  'Gestion de projet': 'bg-brand-purple/10 text-brand-purple-light border-brand-purple/30',
  'SaaS': 'bg-brand-green/10 text-brand-green-light border-brand-green/30',
}

interface BlogPostProps {
  post: BlogPostData
}

export default function BlogPost({ post }: BlogPostProps) {
  const { html, toc } = processArticleHtml(post.content)

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-brand-cyan transition-colors text-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour au blog
        </Link>
      </div>

      {/* Hero de l'article */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <header className="mb-12">
            {/* Badge catégorie */}
            <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border mb-6 ${categoryColors[post.categorie] || 'bg-brand-purple/10 text-brand-purple-light border-brand-purple/30'}`}>
              {post.categorie}
            </div>

            {/* Titre */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-1px' }}>
              {post.titre_seo}
            </h1>

            {/* Meta description */}
            <p className="text-xl text-white/50 mb-6 leading-relaxed italic">
              {post.meta_description}
            </p>

            {/* Image hero */}
            {post.image && (
              <div className="w-full h-[420px] rounded-2xl overflow-hidden border border-white/10 mb-10">
                <Image
                  src={post.image}
                  alt={post.titre_seo}
                  width={1536}
                  height={1024}
                  preload
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Métadonnées */}
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

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-8">
              {/* Wrapper glassmorphism */}
              <div
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12"
                style={{ backdropFilter: 'blur(12px)' }}
              >
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>

              {/* CTA bas de page */}
              <div className="mt-12">
                <div
                  className="relative overflow-hidden rounded-2xl p-8 md:p-10 border border-white/10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(14,165,233,0.12))',
                    backdropFilter: 'blur(12px)'
                  }}
                >
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Cet article vous a intéressé ?
                    </h3>
                    <p className="text-white/70 mb-6 text-lg">
                      Parlons de votre projet. Premier diagnostic gratuit et sans engagement.
                    </p>
                    <Link
                      href="/contact"
                      className="btn-beam font-display transition-colors duration-200 hover:!text-[#4B7BF5] inline-block"
                      style={{
                        color: '#F0EDE8',
                        border: '1px solid rgba(240, 237, 232, 0.35)',
                        borderRadius: '100px',
                        background: 'transparent',
                        fontSize: '18px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        padding: '8px 20px',
                        textDecoration: 'none',
                      }}
                    >
                      Prendre Rendez-vous →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Retour au blog */}
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

            {/* Table des matières (sidebar sticky desktop) */}
            {toc.length > 0 && (
              <aside className="hidden lg:block lg:col-span-4">
                <div className="sticky top-8">
                  <div
                    className="bg-white/[0.03] border border-white/10 rounded-xl p-6"
                    style={{ backdropFilter: 'blur(12px)' }}
                  >
                    <h4 className="text-sm uppercase tracking-wider font-semibold text-white/80 mb-4">
                      Table des matières
                    </h4>
                    <nav>
                      <ul className="space-y-2.5">
                        {toc.map((item) => (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              className="block text-sm text-white/60 hover:text-brand-cyan transition-colors leading-relaxed hover:translate-x-1 transform duration-200"
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>
    </>
  )
}
