import type { Metadata } from 'next'
import Image from 'next/image'
import CaseStudyBlock from '@/components/sections/CaseStudyBlock'
import QuoteCTA from '@/components/sections/QuoteCTA'
import { caseStudies } from '@/lib/data/caseStudies'
import { pageContentStyle } from '@/lib/pageLayout'
import { pageMetadata } from '@/lib/seo'

const introBodyStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 'clamp(15px, 2vw, 17px)',
  fontWeight: 300,
  color: 'rgba(240, 237, 232, 0.6)',
  lineHeight: 1.7,
} as const

export const metadata: Metadata = pageMetadata(
  'Cas concrets',
  'Quelques exemples de frictions opérationnelles supprimées grâce à des systèmes plus fluides et plus pilotables.',
  { path: '/cas-clients' }
)

export default function CasClientsPage() {
  return (
    <>
      <section style={{ width: '100%' }}>
        <div
          style={{
            ...pageContentStyle,
            paddingTop: 'clamp(45px, 5.6vw, 90px)',
            paddingBottom: 'clamp(45px, 5.6vw, 90px)',
          }}
        >
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  color: '#4B7BF5',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                — Cas concrets
              </p>
              <h1
                className="text-kls-text"
                style={{
                  fontSize: 'clamp(2rem, 5.5vw, 4rem)',
                  fontWeight: 600,
                  color: '#F0EDE8',
                  fontFamily: 'var(--font-display)',
                  margin: 0,
                  lineHeight: 1.06,
                  letterSpacing: '-0.02em',
                }}
              >
                Des transformations opérationnelles concrètes.
              </h1>
              <p className="mt-8" style={introBodyStyle}>
                Quelques exemples de frictions opérationnelles supprimées grâce à des systèmes plus
                fluides et plus pilotables.
              </p>
              <p className="mt-6" style={introBodyStyle}>
                Ces trois cas illustrent la même méthode appliquée à des frictions différentes :
                identifier ce qui ralentit réellement l&apos;organisation, simplifier avant
                d&apos;automatiser, et rendre le résultat pilotable dans la durée. Les secteurs
                varient, l&apos;approche reste la même.
              </p>
              <p className="mt-6" style={introBodyStyle}>
                Chaque exemple décrit une friction concrète, ce qui a été simplifié, et le résultat
                obtenu pour les équipes. Ce ne sont pas des démonstrations d&apos;outils : ce sont
                des opérations qui perdaient du temps, de la visibilité ou de la fiabilité, puis
                qui sont devenues plus simples à tenir au quotidien.
              </p>
            </div>

            <div
              className="relative hidden min-h-[420px] overflow-hidden lg:block"
              style={{
                borderRadius: 16,
                background: '#FFFFFF',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.42)',
              }}
            >
              <Image
                src="/cas-clients-illustration.png"
                alt="Illustration des cas concrets KLS3"
                fill
                sizes="(min-width: 1024px) 50vw, 0px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-16" />

          {caseStudies.map((cas, i) => (
            <CaseStudyBlock key={cas.id} cas={cas} isLast={i === caseStudies.length - 1} />
          ))}

          <p className="mt-16 max-w-2xl" style={introBodyStyle}>
            Chacune de ces transformations est partie d&apos;un signal simple — un temps perdu, une
            donnée introuvable, un oubli répété — jamais d&apos;un projet informatique déclaré comme
            tel. C&apos;est cette lecture opérationnelle, plutôt que technologique, qui permet à
            KLS3 d&apos;intervenir vite et sans bouleverser les outils déjà en place.
          </p>
        </div>
      </section>

      <QuoteCTA
        quote="Les meilleures améliorations opérationnelles sont souvent les plus invisibles."
        ctaLabel="Parler de vos opérations"
        ctaHref="/contact"
        variant="accent"
      />
    </>
  )
}
