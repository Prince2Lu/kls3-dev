import { CheckCircle2, Play } from 'lucide-react'
import { hero } from '@/lib/data/home'
import s from './home.module.css'

export default function Hero() {
  const { screen } = hero

  return (
    <section id="accueil" className={s.hero}>
      <div className={s.wrap}>
        <div>
          <span className={s.tag} style={{ background: '#2d255d', color: '#d6b5ff' }}>
            {hero.tag}
          </span>
          <h1>
            {hero.titleLine1}
            <span className={s['grad-text']}>{hero.titleLine2}</span>
          </h1>
          <p>{hero.text}</p>
          <p className={s.smalldesc}>{hero.smalldesc}</p>
          <div className={s.actions}>
            <a className={`${s.btn} ${s['btn-primary']}`} href="#solutions">
              {hero.primaryCta}
            </a>
            <a className={`${s.btn} ${s['btn-outline']}`} href="#docflow">
              <span>
                {hero.secondaryCta} <Play size={15} />
              </span>
            </a>
          </div>
          <div className={s['hero-benefits']}>
            {hero.benefits.map(({ icon: Icon, label }) => (
              <span key={label}>
                <Icon size={13} /> {label}
              </span>
            ))}
          </div>
        </div>
        <div className={s.screen} aria-label={screen.ariaLabel}>
          <div className={s.screenbar}>
            <span>
              <CheckCircle2 size={13} /> {screen.name}
            </span>
            <span style={{ color: '#c5b9fb' }}>{screen.subtitle}</span>
          </div>
          <div className={s.screenbody}>
            <h3 style={{ fontSize: 21, marginBottom: 18 }}>{screen.title}</h3>
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
            <p className={s.notice}>{screen.notice}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
