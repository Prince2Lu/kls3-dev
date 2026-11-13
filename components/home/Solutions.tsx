import { solutions } from '@/lib/data/home'
import SectionLabel from './SectionLabel'
import s from './home.module.css'

export default function Solutions() {
  return (
    <section id="solutions" className={s.section}>
      <div className={s.wrap}>
        <div className={s['title-space']}>
          <SectionLabel>{solutions.tag}</SectionLabel>
          <h2>
            {solutions.titleLine1}
            <br />
            {solutions.titleLine2}
          </h2>
        </div>
        <div className={s.grid3}>
          {solutions.offers.map((offer) => (
            <article
              key={offer.title}
              className={`${s.card} ${s.offer} ${offer.highlight ? s.highlight : ''}`}
            >
              <p className={`${s.num} ${offer.highlight ? s.blue : ''}`}>{offer.number}</p>
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
