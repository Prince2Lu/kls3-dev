import Image from 'next/image'
import { realisations } from '@/lib/data/home'
import { hasPublicFile } from '@/lib/home/assets'
import s from './home.module.css'

export default function Realisations() {
  return (
    <section id="realisations" className={`${s.section} ${s.realizations}`}>
      <div className={s.wrap}>
        <div className={s['title-space']}>
          <span className={s.tag}>{realisations.tag}</span>
          <h2>
            {realisations.titleLine1}
            <br />
            {realisations.titleLine2}
          </h2>
          <p className={s.lead} style={{ marginInline: 'auto' }}>
            {realisations.lead}
          </p>
        </div>
        <ProjectCards />
      </div>
    </section>
  )
}

// Cartes projets, réutilisées sur /solutions/sur-mesure (sans le lien « Découvrir le projet »)
export function ProjectCards({ withCta = true }: { withCta?: boolean }) {
  return (
    <div className={s.projectgrid}>
      {realisations.projects.map((project) => (
        <article key={project.title} className={`${s.card} ${s.project}`}>
          {hasPublicFile(project.image) ? (
            <div className={s.shot}>
              <Image
                src={project.image}
                alt={project.windowTitle}
                fill
                sizes="(max-width: 760px) 100vw, 595px"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          ) : (
            <div className={`${s.fakeapp} ${project.variant === 'well' ? s.well : ''}`}>
              <div className={s['fake-window']}>
                <strong>{project.windowTitle}</strong>
                <div className={s['fake-lines']}>
                  <span />
                  <span style={project.variant === 'well' ? { background: '#d8f5e3' } : undefined} />
                  <span />
                </div>
                <small>{realisations.placeholderNote}</small>
              </div>
            </div>
          )}
          <div className={s['project-desc']}>
            <span className={s.tag}>{project.tag}</span>
            <h3 style={{ marginTop: 15 }}>{project.title}</h3>
            <strong>{project.punchline}</strong>
            <p>{project.text}</p>
            {withCta && <a href="#contact">{project.cta}</a>}
          </div>
        </article>
      ))}
    </div>
  )
}
