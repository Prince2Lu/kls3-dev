import { financements } from '@/lib/data/home'
import s from './home.module.css'

export default function Financements() {
  return (
    <section id="financements" className={`${s.section} ${s.funding}`}>
      <div className={`${s.wrap} ${s.fundgrid}`}>
        <div>
          <span className={s.tag}>{financements.tag}</span>
          <h2>
            {financements.titleStart}
            <span style={{ color: '#7430ef' }}>{financements.titleAccent}</span>
          </h2>
          <p className={s.lead}>{financements.lead}</p>
          <a href="#contact" className={`${s.btn} ${s['btn-primary']}`}>
            {financements.cta}
          </a>
          <p className={s.fundnote}>{financements.note}</p>
        </div>
        <div>
          <div className={s.fundcards}>
            {financements.cards.map(({ icon: Icon, title, text }) => (
              <div key={title} className={`${s.card} ${s.fundcard}`}>
                <div>
                  <Icon size={32} />
                </div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
