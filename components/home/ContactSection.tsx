import { contactSection } from '@/lib/data/home'
import SectionLabel from './SectionLabel'
import s from './home.module.css'

export default function ContactSection() {
  return (
    <section id="contact" className={`${s.band} ${s.ending}`}>
      <div className={s.wrap}>
        <SectionLabel dark>{contactSection.tag}</SectionLabel>
        <h2>
          {contactSection.titleStart}
          <span className={s.hl}>{contactSection.titleAccent}</span>
        </h2>
        <p>{contactSection.text}</p>
        <div className={s.endcards}>
          {contactSection.cards.map((card) => (
            <div key={card.source} className={`${s.endcard} ${card.primary ? s.primary : ''}`}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              {/* Ouvre la ContactModal (écoute des clics sur data-contact-source) */}
              <button
                type="button"
                data-contact-source={card.source}
                className={`${s.btn} ${card.primary ? s['btn-primary'] : s['btn-dark']}`}
              >
                {card.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
