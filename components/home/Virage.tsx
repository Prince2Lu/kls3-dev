import { virage } from '@/lib/data/home'
import SectionLabel from './SectionLabel'
import s from './home.module.css'

// Bandeau « virage » entre la recherche et Solutions
export default function Virage() {
  return (
    <section className={`${s.band} ${s.virage}`}>
      <div className={s.wrap}>
        <div>
          <SectionLabel dark>{virage.label}</SectionLabel>
          <p className={s.statement}>
            {virage.titleLine1}
            <br />
            <span className={s.hl}>{virage.titleLine2}</span>
          </p>
        </div>
        <div>
          <p>{virage.text}</p>
          {/* Ouvre la ContactModal (écoute des clics sur data-contact-source) */}
          <button type="button" data-contact-source={virage.source} className={`${s.btn} ${s['btn-primary']}`}>
            {virage.cta}
          </button>
        </div>
      </div>
    </section>
  )
}
