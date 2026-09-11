'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import BlogCard from '@/components/ui/BlogCard'
import SectionLabel from '@/components/ui/SectionLabel'
import { type BlogListingPost } from '@/lib/mdx'

const ARTICLES_PAR_PAGE = 6

interface BlogPageClientProps {
  posts: BlogListingPost[]
}

const categoryColors: Record<string, string> = {
  'Intelligence artificielle': 'cyan',
  'Transformation digitale': 'cyan',
  'Gestion de projet': 'purple',
  'LegalTech & FinTech': 'purple',
  'Solutions SaaS': 'green',
  'Stratégie & Management': 'green',
}

const categoryBadgeColors: Record<string, string> = {
  'Intelligence artificielle': 'bg-brand-cyan/10 text-brand-cyan-light border-brand-cyan/30',
  'Transformation digitale': 'bg-brand-cyan/10 text-brand-cyan-light border-brand-cyan/30',
  'Gestion de projet': 'bg-brand-purple/10 text-brand-purple-light border-brand-purple/30',
  'LegalTech & FinTech': 'bg-brand-purple/10 text-brand-purple-light border-brand-purple/30',
  'Solutions SaaS': 'bg-brand-green/10 text-brand-green-light border-brand-green/30',
  'Stratégie & Management': 'bg-brand-green/10 text-brand-green-light border-brand-green/30',
}

const getCategoryStyles = (category: string, isActive: boolean) => {
  const color = categoryColors[category]

  if (isActive) {
    return 'bg-gradient-to-r from-brand-purple to-brand-cyan text-white'
  }

  // Inactive styles with glassmorphism
  return 'bg-white/[0.03] border border-white/10 text-white/50 hover:text-white/70 hover:bg-white/[0.05]'
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes')
  const [currentPage, setCurrentPage] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(posts.map(post => post.categorie)))
    return ['Toutes', ...uniqueCategories]
  }, [posts])

  // Reset page à 1 quand on change de catégorie
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  // Scroll vers le haut de la grille au changement de page
  useEffect(() => {
    if (currentPage > 1) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentPage])

  // Featured post (only for "Toutes" category)
  const featuredSlug = 'kls3-qui-sommes-nous-comment-nous-travaillons'
  const featuredPost = useMemo(() => {
    return posts.find(p => p.slug === featuredSlug) || null
  }, [posts])

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'Toutes') {
      // Tous les articles sauf le featured
      return posts.filter(p => p.slug !== featuredSlug)
    }
    // Filtrer par catégorie, pas de featured
    return posts.filter(p => p.categorie === selectedCategory)
  }, [posts, selectedCategory])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / ARTICLES_PAR_PAGE)
  const paginatedPosts = useMemo(() => {
    return filteredPosts.slice(
      (currentPage - 1) * ARTICLES_PAR_PAGE,
      currentPage * ARTICLES_PAR_PAGE
    )
  }, [filteredPosts, currentPage])

  return (
    <>
      {/* Hero */}
      <section className="relative py-24">
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <SectionLabel className="mb-4">Blog</SectionLabel>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Articles & <span className="gradient-text">ressources</span>
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
            Réflexions et retours d'expérience sur l'IA, la gestion de projet et le développement SaaS.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${getCategoryStyles(category, selectedCategory === category)}`}
                style={selectedCategory !== category ? { backdropFilter: 'blur(12px)' } : undefined}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured article - only when "Toutes" is selected */}
      {featuredPost && selectedCategory === 'Toutes' && (
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-6">Article à la une</h2>
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.01] transition-transform duration-300" style={{ backdropFilter: 'blur(12px)' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image à gauche */}
                  {featuredPost.image && (
                    <div className="relative h-64 lg:h-full">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.titre_seo}
                        width={1536}
                        height={1024}
                        preload
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Contenu à droite */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border mb-4 w-fit ${categoryBadgeColors[featuredPost.categorie] || 'bg-brand-purple/10 text-brand-purple-light border-brand-purple/30'}`}>
                      {featuredPost.categorie}
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                      {featuredPost.titre_seo}
                    </h2>

                    <p className="text-foreground/70 leading-relaxed mb-6 line-clamp-3">
                      {featuredPost.meta_description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-foreground/50 mb-6">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.publishedAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime} min
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2 text-brand-purple-light hover:text-brand-purple transition-colors font-medium">
                      Lire l'article
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Posts grid */}
      <section className="pb-24" ref={gridRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <p className="text-white/40 text-center py-12">
              Aucun article dans cette catégorie pour le moment.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {/* Bouton précédent */}
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg text-sm glass-card disabled:opacity-30 hover:border-brand-purple/50 transition-colors"
                  >
                    ← Précédent
                  </button>

                  {/* Numéros de pages */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-lg text-sm transition-colors ${
                        page === currentPage
                          ? 'bg-gradient-to-r from-brand-purple to-brand-cyan text-white'
                          : 'glass-card text-white/50 hover:text-white hover:border-brand-purple/50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Bouton suivant */}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg text-sm glass-card disabled:opacity-30 hover:border-brand-purple/50 transition-colors"
                  >
                    Suivant →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
