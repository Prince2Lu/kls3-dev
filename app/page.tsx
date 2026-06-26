import Link from 'next/link'
import HeroOperational from '@/components/sections/HeroOperational'
import FrictionsScanner from '@/components/sections/FrictionsScanner'
import KLS3MethodTimeline from '@/components/sections/KLS3MethodTimeline'
import ResultsSection from '@/components/sections/ResultsSection'
import SystemsSection from '@/components/sections/SystemsSection'
import TeamSection from '@/components/sections/TeamSection'
import BlogPreview from '@/components/sections/BlogPreview'
import FinalCTA from '@/components/sections/FinalCTA'

export default function Home() {
  return (
    <>
      <div className="flex md:hidden justify-center pt-20 pb-4 px-4">
        <div className="flex flex-col items-center gap-1">
          <Link
            href="/contact"
            className="btn-beam font-display transition-colors duration-200 hover:!text-[#4B7BF5]"
            style={{
              display: 'inline-block',
              padding: '10px 22px',
              border: '1px solid rgba(240,237,232,0.35)',
              borderRadius: '100px',
              color: '#F0EDE8',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
              background: 'transparent',
              position: 'relative',
              isolation: 'isolate',
            }}
          >
            Analyser mes opérations →
          </Link>
          <span
            style={{
              fontSize: '10px',
              color: 'rgba(240,237,232,0.35)',
              letterSpacing: '0.04em',
            }}
          >
            Sans engagement · Réponse sous 48h
          </span>
        </div>
      </div>
      <HeroOperational />
      <FrictionsScanner loadFonts={false} />
      <KLS3MethodTimeline />
      <ResultsSection />
      <SystemsSection />
      <TeamSection />
      <BlogPreview />
      <FinalCTA />
    </>
  )
}
