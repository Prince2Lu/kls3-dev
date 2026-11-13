import { hero } from '@/lib/data/home'
import SectionLabel from './SectionLabel'
import s from './home.module.css'

export default function Hero() {
  const { screen } = hero

  return (
    <section id="accueil" className={s.hero}>
      <div className={s.wrap}>
        <div>
          <SectionLabel dark>{hero.tag}</SectionLabel>
          <h1>
            {hero.titleLine1}
            <br />
            <span className={s.hl}>{hero.titleLine2}</span>
          </h1>
          <p>{hero.text}</p>
          <p className={s.smalldesc}>{hero.smalldesc}</p>
          <div className={s.actions}>
            <a className={`${s.btn} ${s['btn-primary']}`} href="#solutions">
              {hero.primaryCta}
            </a>
            <a className={`${s.btn} ${s['btn-dark']}`} href="#docflow">
              {hero.secondaryCta} ▷
            </a>
          </div>
          <div className={s['hero-benefits']}>
            {hero.benefits.map((label) => (
              <span key={label}>
                <span aria-hidden="true">●</span> {label}
              </span>
            ))}
          </div>
        </div>
        <div className={s.screen} aria-label={screen.ariaLabel}>
          <div className={s.screenbar}>
            <span>{screen.name}</span>
            <small>{screen.subtitle}</small>
          </div>
          <div className={s.screenbody}>
            <p className={s.screentitle}>{screen.title}</p>
            <table>
              <thead>
                <tr>
                  {screen.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {screen.rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.doc}</td>
                    <td>
                      <span className={`${s.status} ${s[row.tone]}`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={s.notice}>{screen.notice}</p>
        </div>
      </div>
    </section>
  )
}
