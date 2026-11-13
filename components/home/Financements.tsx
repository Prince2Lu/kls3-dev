import { financements } from '@/lib/data/home'
import SectionLabel from './SectionLabel'
import s from './home.module.css'

export default function Financements() {
  return (
    <section id="financements" className={s.section}>
      <div className={`${s.wrap} ${s.fundgrid}`}>
        <div>
          <SectionLabel>{financements.tag}</SectionLabel>
          <h2>
            {financements.titleStart}
            <span className={s.accent}>{financements.titleAccent}</span>
          </h2>
          <p className={s.lead}>{financements.lead}</p>
          <a href="#contact" className={`${s.btn} ${s['btn-outline']}`}>
            {financements.cta}
          </a>
          <p className={s.fundnote}>{financements.note}</p>
        </div>
        <div className={s.fundcards}>
          {financements.cards.map(({ code, title, text }) => (
            <div key={title} className={`${s.card} ${s.fundcard}`}>
              <p className={`${s.num} ${s.blue}`}>{code}</p>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
