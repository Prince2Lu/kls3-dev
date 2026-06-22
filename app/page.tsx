import Hero from '@/components/sections/Hero'
import Problems from '@/components/sections/Problems'
import Pillars from '@/components/sections/Pillars'
import Sectors from '@/components/sections/Sectors'
import BlogPreview from '@/components/sections/BlogPreview'
import CTABand from '@/components/ui/CTABand'
import { getAllPosts } from '@/lib/mdx'

export default function Home() {
  const allPosts = getAllPosts()
  const recentPosts = allPosts.slice(0, 4)

  return (
    <>
      <Hero />
      <Problems />
      <Pillars />
      <Sectors />
      <BlogPreview posts={recentPosts} />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <CTABand
          title="Parlons de votre projet."
          description="Mission, transformation digitale, solution SaaS ou simple question — nous répondons sous 24h."
          ctaText="Prendre rendez-vous"
          ctaHref="/contact"
          subtitle="Premier échange gratuit · Sans engagement"
        />
      </div>
    </>
  )
}
