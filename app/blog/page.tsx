import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import BlogCard from '@/components/ui/BlogCard'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles sur l\'IA, la gestion de projet et le développement SaaS.',
}

export default function BlogPage() {
  const posts = getAllPosts()

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

      {/* Posts grid */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-foreground/60 text-lg">
                Aucun article publié pour le moment. Revenez bientôt !
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
