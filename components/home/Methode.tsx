import { methode } from '@/lib/data/home'
import s from './home.module.css'

export default function Methode() {
  return (
    <section id="methode" className={`${s.section} ${s.method}`}>
      <div className={s.wrap}>
        <span className={s.tag} style={{ background: '#5032a1', color: 'white' }}>
          {methode.tag}
        </span>
        <h2>
          {methode.titleLine1}
          <br />
          {methode.titleLine2Start}
          <span className={s['grad-text']}>{methode.titleLine2Accent}</span>
        </h2>
        <p className={s.lead}>{methode.lead}</p>
        <div className={s.methodsteps}>
          {methode.steps.map(({ icon: Icon, ...step }) => (
            <div key={step.number} className={s.methodcard}>
              <span className={s.glyph}>
                <Icon size={30} />
              </span>
              <span className={s.number}>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
        <div className={s['method-note']}>
          <strong>{methode.noteStrong}</strong>
          <br />
          {methode.noteText}
        </div>
      </div>
    </section>
  )
}
