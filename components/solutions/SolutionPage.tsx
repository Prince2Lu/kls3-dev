import { CheckCircle2, ChevronDown } from 'lucide-react'
import HomeHeader from '@/components/home/HomeHeader'
import HomeFooter from '@/components/home/HomeFooter'
import ContactModal from '@/components/home/ContactModal'
import { ProjectCards } from '@/components/home/Realisations'
import SectionLabel from '@/components/home/SectionLabel'
import JsonLd from '@/components/seo/JsonLd'
import s from '@/components/home/home.module.css'
import { kls3CompanyInfo } from '@/lib/data/company-info'
import { solutionSections, type SolutionAction, type SolutionPageContent } from '@/lib/data/solutions'
import { SITE_URL } from '@/lib/seo'

// Bouton : ouvre la ContactModal (data-contact-source) ou renvoie vers une ancre de la home
function ActionButton({ action, className }: { action: SolutionAction; className: string }) {
  if ('source' in action) {
    return (
      <button type="button" data-contact-source={action.source} className={className}>
        {action.label}
      </button>
    )
  }
  return (
    <a href={action.href} className={className}>
      {action.label}
    </a>
  )
}

// Gabarit commun des pages /solutions/* — même langage visuel que la homepage (design system V5)
export default function SolutionPage({ content }: { content: SolutionPageContent }) {
  const { hero, problem, features, needs, steps, specific, faq, cta } = content
  const path = `/solutions/${content.slug}`

  return (
    <div className={s.root}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: content.service.name,
          serviceType: content.service.serviceType,
          description: content.meta.description,
          url: `${SITE_URL}${path}`,
          provider: {
            '@type': 'Organization',
            name: kls3CompanyInfo.nom,
            url: SITE_URL,
          },
          areaServed: [
            { '@type': 'AdministrativeArea', name: 'Grand Est' },
            { '@type': 'Country', name: 'Luxembourg' },
          ],
        }}
      />
      <HomeHeader base="/" />
      <div>
        <section className={`${s.hero} ${s.solhero}`}>
          <div className={s.wrap}>
            <div>
              <SectionLabel dark>{hero.tag}</SectionLabel>
              <h1>
                {hero.title}
                <span className={s.hl}>{hero.titleHighlight}</span>
              </h1>
              <p>{hero.intro}</p>
              <div className={s.actions}>
                <ActionButton action={hero.actions[0]} className={`${s.btn} ${s['btn-primary']}`} />
                <ActionButton action={hero.actions[1]} className={`${s.btn} ${s['btn-dark']}`} />
              </div>
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.solproblem}`}>
          <div className={s.wrap}>
            <SectionLabel>{solutionSections.problemTag}</SectionLabel>
            <h2>{problem.title}</h2>
            <p className={s.lead}>{problem.text}</p>
          </div>
        </section>

        <section className={s.section} style={{ paddingTop: 0 }}>
          <div className={s.wrap}>
            <div className={s['title-space']}>
              <h2>{features.title}</h2>
            </div>
            <div className={features.cards.length === 4 ? s.grid4 : s.grid3}>
              {features.cards.map(({ icon: Icon, ...card }, index) => (
                <article key={card.title} className={`${s.card} ${s.solcard}`}>
                  <div className={s.cardhead}>
                    <span className={`${s.num} ${s.blue}`}>{String(index + 1).padStart(2, '0')}</span>
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.solneeds}`}>
          <div className={s.wrap}>
            <h2>{needs.title}</h2>
            <ul className={s.checklist}>
              {needs.items.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${s.section} ${s.method}`}>
          <div className={s.wrap}>
            <h2>{solutionSections.stepsTitle}</h2>
            <div className={s.timeline}>
              <div className={s.methodsteps}>
                {steps.map((step) => (
                  <div key={step.number} className={s.methodstep}>
                    <span className={s.dot} aria-hidden="true" />
                    <span className={s.num}>
                      {step.number}
                      {step.mention && <span className={s.mention}>{step.mention}</span>}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {specific?.kind === 'points' && (
          <section className={`${s.band} ${s.solspecific}`}>
            <div className={s.wrap}>
              <h2>{specific.title}</h2>
              <div className={s.solpoints}>
                {specific.points.map((point, index) => (
                  <div key={point} className={s.solpoint}>
                    <span className={s.num}>{String(index + 1).padStart(2, '0')}</span>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
              {specific.note && <p className={s.solnote}>{specific.note}</p>}
            </div>
          </section>
        )}

        {specific?.kind === 'realisations' && (
          <section className={s.section}>
            <div className={s.wrap}>
              <div className={s['title-space']}>
                <h2>{specific.title}</h2>
              </div>
              <ProjectCards withCta={false} />
            </div>
          </section>
        )}

        <section className={`${s.section} ${s.solfaq}`}>
          <div className={s.wrap}>
            <div className={s['title-space']}>
              <h2>{solutionSections.faqTitle}</h2>
            </div>
            <div className={s.faq}>
              {faq.map((item) => (
                <details key={item.question} className={s.card}>
                  <summary>
                    {item.question}
                    <ChevronDown size={18} aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={`${s.band} ${s.ending}`}>
          <div className={s.wrap}>
            <h2>{cta.title}</h2>
            <p>{cta.text}</p>
            <div className={s.endactions}>
              <ActionButton action={cta.actions[0]} className={`${s.btn} ${s['btn-primary']}`} />
              <ActionButton action={cta.actions[1]} className={`${s.btn} ${s['btn-dark']}`} />
            </div>
          </div>
        </section>
      </div>
      <HomeFooter base="/" />
      <ContactModal />
    </div>
  )
}
