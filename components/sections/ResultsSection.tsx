import ResultCard from '@/components/ui/ResultCard'
import SectionLabel from '@/components/ui/SectionLabel'
import { results } from '@/lib/data/results'
import { Stagger, StaggerItem } from '@/components/ui/Motion'
import { sectionContainerStyle } from '@/lib/pageLayout'

export default function ResultsSection() {
  return (
    <section
      id="resultats"
      className="border-b border-kls-border scroll-mt-20"
      style={{ width: '100%' }}
    >
      <div style={sectionContainerStyle}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SectionLabel>Impact opérationnel</SectionLabel>
        </div>
        <h2
          className="text-kls-text mb-12"
          style={{
            fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            textAlign: 'center',
          }}
        >
          Ce que ça change concrètement
        </h2>

        <div style={{ maxWidth: 860, margin: '0 auto', width: '100%' }}>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            {results.map((result) => (
              <StaggerItem key={result.title} className="h-full">
                <ResultCard result={result} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
