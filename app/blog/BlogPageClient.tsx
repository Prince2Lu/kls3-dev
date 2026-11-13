'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import BlogCard from '@/components/ui/BlogCard'
import SectionLabel from '@/components/home/SectionLabel'
import s from '@/components/home/home.module.css'
import b from '@/components/blog/blog.module.css'
import { type BlogListingPost } from '@/lib/mdx'

const ARTICLES_PAR_PAGE = 6

interface BlogPageClientProps {
  posts: BlogListingPost[]
}

// TODO: à valider par Eric/Lilian (titre et accroche du blog)
const blogIntro = {
  label: 'Blog',
  title: 'Ressources pour simplifier vos opérations',
  lead: "Méthodes, retours d'expérience et cas concrets pour gagner du temps sur vos opérations.",
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
    <div className={`${s.root} ${b.scope}`}>
      <div className={`${s.wrap} ${b.page}`}>
        <header className={b.intro}>
          <SectionLabel>{blogIntro.label}</SectionLabel>
          <h1>{blogIntro.title}</h1>
          <p>{blogIntro.lead}</p>
        </header>

        <div className={b.chips} role="group" aria-label="Filtrer par catégorie">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={b.chip}
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Article à la une : uniquement sur « Toutes » */}
        {featuredPost && selectedCategory === 'Toutes' && (
          <>
            <p className={b.featuredlabel}>Article à la une</p>
            <BlogCard post={featuredPost} featured />
          </>
        )}

        <div ref={gridRef} className={s.anchor}>
          {filteredPosts.length === 0 ? (
            <p className={b.empty}>Aucun article dans cette catégorie pour le moment.</p>
          ) : (
            <>
              <div className={b.grid}>
                {paginatedPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav className={b.pagination} aria-label="Pagination">
                  <button
                    type="button"
                    className={b.pagebtn}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    ← Précédent
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={b.pagebtn}
                      aria-current={page === currentPage ? 'page' : undefined}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={b.pagebtn}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Suivant →
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
