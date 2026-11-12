import { contactSection } from '@/lib/data/home'
import s from './home.module.css'

export default function ContactSection() {
  return (
    <section id="contact" className={`${s.section} ${s.ending}`}>
      <div className={s.wrap}>
        <span className={s.tag} style={{ color: '#fff', background: '#5132a0' }}>
          {contactSection.tag}
        </span>
        <h2>
          {contactSection.titleStart}
          <span className={s['grad-text']}>{contactSection.titleAccent}</span>
        </h2>
        <p>{contactSection.text}</p>
        <div className={s.endcards}>
          {contactSection.cards.map(({ icon: Icon, ...card }) => (
            <div key={card.source} className={`${s.endcard} ${card.primary ? s.primary : ''}`}>
              <span className={s.symbol}>
                <Icon size={33} />
              </span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              {/* Ouvre la ContactModal (écoute des clics sur data-contact-source) */}
              <button
                type="button"
                data-contact-source={card.source}
                className={`${s.btn} ${card.primary ? s['btn-white'] : s['btn-outline']}`}
                style={card.primary ? undefined : { color: 'white', borderColor: '#8d7fae' }}
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
