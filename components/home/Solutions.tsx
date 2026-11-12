import { solutions } from '@/lib/data/home'
import s from './home.module.css'

export default function Solutions() {
  return (
    <section id="solutions" className={`${s.section} ${s.solutions}`}>
      <div className={s.wrap}>
        <div className={s['title-space']}>
          <span className={s.tag}>{solutions.tag}</span>
          <h2>
            {solutions.titleLine1}
            <br />
            {solutions.titleLine2}
          </h2>
        </div>
        <div className={s.grid3}>
          {solutions.offers.map(({ icon: Icon, ...offer }) => (
            <article
              key={offer.title}
              className={`${s.card} ${s.offer} ${offer.highlight ? s.highlight : ''}`}
            >
              <div className={s.emoji}>
                <Icon size={29} />
              </div>
              <h3>{offer.title}</h3>
              <strong>{offer.punchline}</strong>
              <p>{offer.text}</p>
              <a href={offer.href}>{offer.cta}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
