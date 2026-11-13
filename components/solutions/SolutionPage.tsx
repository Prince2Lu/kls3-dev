import { CheckCircle2, ChevronDown, ShieldCheck } from 'lucide-react'
import HomeHeader from '@/components/home/HomeHeader'
import HomeFooter from '@/components/home/HomeFooter'
import ContactModal from '@/components/home/ContactModal'
import { ProjectCards } from '@/components/home/Realisations'
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

// Gabarit commun des pages /solutions/* — même langage visuel que la homepage
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
              <span className={s.tag} style={{ background: '#2d255d', color: '#d6b5ff' }}>
                {hero.tag}
              </span>
              <h1>{hero.title}</h1>
              <p>{hero.intro}</p>
              <div className={s.actions}>
                <ActionButton action={hero.actions[0]} className={`${s.btn} ${s['btn-primary']}`} />
                <ActionButton action={hero.actions[1]} className={`${s.btn} ${s['btn-outline']}`} />
              </div>
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.solproblem}`}>
          <div className={s.wrap}>
            <span className={s.tag}>{solutionSections.problemTag}</span>
            <h2>{problem.title}</h2>
            <p className={s.lead}>{problem.text}</p>
          </div>
        </section>

        <section className={`${s.section} ${s.solfeatures}`}>
          <div className={s.wrap}>
            <div className={s['title-space']}>
              <h2>{features.title}</h2>
            </div>
            <div className={features.cards.length === 4 ? s.grid4 : s.grid3}>
              {features.cards.map(({ icon: Icon, ...card }) => (
                <article key={card.title} className={`${s.card} ${s.offer} ${s.solcard}`}>
                  <div className={s.emoji}>
                    <Icon size={29} />
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
                  <CheckCircle2 size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${s.section} ${s.method}`}>
          <div className={s.wrap}>
            <h2>{solutionSections.stepsTitle}</h2>
            <div className={s.methodsteps}>
              {steps.map(({ icon: Icon, ...step }) => (
                <div key={step.number} className={s.methodcard}>
                  <span className={s.glyph}>
                    <Icon size={30} />
                  </span>
                  <span className={s.number}>{step.number}</span>
                  {step.mention && <span className={s.mention}>{step.mention}</span>}
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {specific?.kind === 'points' && (
          <section className={`${s.section} ${s.solspecific}`}>
            <div className={s.wrap}>
              <div className={s['title-space']}>
                <h2>{specific.title}</h2>
              </div>
              <div className={s.grid3}>
                {specific.points.map((point) => (
                  <div key={point} className={`${s.card} ${s.solpoint}`}>
                    <span className={s.ic}>
                      <ShieldCheck size={21} />
                    </span>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
              {specific.note && <p className={`${s.notice} ${s.solnote}`}>{specific.note}</p>}
            </div>
          </section>
        )}

        {specific?.kind === 'realisations' && (
          <section className={`${s.section} ${s.realizations}`}>
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
                    <ChevronDown size={18} />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.ending}`}>
          <div className={s.wrap}>
            <h2>{cta.title}</h2>
            <p>{cta.text}</p>
            <div className={s.endactions}>
              <ActionButton action={cta.actions[0]} className={`${s.btn} ${s['btn-white']}`} />
              <ActionButton
                action={cta.actions[1]}
                className={`${s.btn} ${s['btn-outline']} ${s['btn-light']}`}
              />
            </div>
          </div>
        </section>
      </div>
      <HomeFooter base="/" />
      <ContactModal />
    </div>
  )
}
