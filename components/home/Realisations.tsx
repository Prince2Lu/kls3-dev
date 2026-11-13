import Image from 'next/image'
import { realisations } from '@/lib/data/home'
import SectionLabel from './SectionLabel'
import s from './home.module.css'

export default function Realisations() {
  return (
    <section id="realisations" className={`${s.section} ${s.realizations}`}>
      <div className={s.wrap}>
        <div className={s['title-space']}>
          <SectionLabel>{realisations.tag}</SectionLabel>
          <h2>
            {realisations.titleLine1}
            <br />
            {realisations.titleLine2}
          </h2>
          <p className={s.lead}>{realisations.lead}</p>
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
          {/* Captures plus hautes que le cadre : on garde le haut de l'écran visible */}
          <div className={s.shot}>
            <Image
              src={project.image}
              alt={project.windowTitle}
              fill
              sizes="(max-width: 760px) 100vw, 595px"
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
          <div className={s['project-desc']}>
            <p className={`${s.num} ${s.blue}`}>{project.tag}</p>
            <h3>{project.title}</h3>
            <strong>{project.punchline}</strong>
            <p>{project.text}</p>
            {withCta && <a href="#contact">{project.cta}</a>}
          </div>
        </article>
      ))}
    </div>
  )
}
