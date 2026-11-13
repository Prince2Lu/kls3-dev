import { methode } from '@/lib/data/home'
import SectionLabel from './SectionLabel'
import s from './home.module.css'

export default function Methode() {
  return (
    <section id="methode" className={`${s.section} ${s.method}`}>
      <div className={s.wrap}>
        <SectionLabel>{methode.tag}</SectionLabel>
        <h2 style={{ marginTop: 16 }}>
          {methode.titleLine1}
          <br />
          {methode.titleLine2Start}
          <span className={s.accent}>{methode.titleLine2Accent}</span>
        </h2>
        <p className={s.lead}>{methode.lead}</p>
        <div className={s.timeline}>
          <div className={s.methodsteps}>
            {methode.steps.map((step) => (
              <div key={step.number} className={s.methodstep}>
                <span className={s.dot} aria-hidden="true" />
                <span className={s.num}>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
