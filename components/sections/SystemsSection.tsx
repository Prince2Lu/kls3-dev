import SystemCard from '@/components/ui/SystemCard'
import SectionLabel from '@/components/ui/SectionLabel'
import { systems } from '@/lib/data/systems'
import { Stagger, StaggerItem } from '@/components/ui/Motion'
import { sectionContainerStyle } from '@/lib/pageLayout'

export default function SystemsSection() {
  return (
    <section
      id="solutions"
      className="scroll-mt-20"
      style={{ width: '100%' }}
    >
      <div style={sectionContainerStyle}>
        <SectionLabel>Systèmes KLS3</SectionLabel>
        <h2
          className="text-kls-text max-w-3xl mb-16"
          style={{
            fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
          }}
        >
          Les systèmes que nous construisons autour de vos opérations
        </h2>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
          {systems.map((system, i) => (
            <StaggerItem key={system.title} className="h-full">
              <SystemCard
                system={system}
                number={String(i + 1).padStart(2, '0')}
                highlight={i === 3}
                descriptionOverride={
                  i === 1 ? (
                    <>
                      Centralisation des données, dashboards, alertes,
                      <br />
                      temps réel.
                    </>
                  ) : undefined
                }
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
