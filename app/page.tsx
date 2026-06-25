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
      <HeroOperational />
      <FrictionsScanner />
      <KLS3MethodTimeline />
      <ResultsSection />
      <SystemsSection />
      <TeamSection />
      <BlogPreview />
      <FinalCTA />
    </>
  )
}
