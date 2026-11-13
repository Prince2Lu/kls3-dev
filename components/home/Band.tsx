import s from './home.module.css'

// Bandeau manifeste V5 : phrase en Syne (fin surlignée) + texte à droite, fond --ink
export default function Band({ start, highlight, text }: { start: string; highlight: string; text: string }) {
  return (
    <section className={s.band}>
      <div className={`${s.wrap} ${s.bandrow}`}>
        <p className={s.manifesto}>
          {start}
          <span className={s.hl}>{highlight}</span>
        </p>
        <p className={s.bandtext}>{text}</p>
      </div>
    </section>
  )
}
