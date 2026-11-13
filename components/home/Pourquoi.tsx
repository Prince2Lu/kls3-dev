import Image from 'next/image'
import { pourquoi } from '@/lib/data/home'
import SectionLabel from './SectionLabel'
import s from './home.module.css'

export default function Pourquoi() {
  return (
    <section id="equipe" className={`${s.section} ${s.why}`}>
      <div className={s.wrap}>
        <SectionLabel>{pourquoi.tag}</SectionLabel>
        <h2 style={{ marginTop: 16 }}>
          {pourquoi.titleLine1}
          <br />
          {pourquoi.titleLine2Start}
          <span className={s.accent}>{pourquoi.titleLine2Accent}</span>
        </h2>
        <p className={s.lead}>{pourquoi.lead}</p>
        <div className={s.whygrid}>
          <div className={`${s.band} ${s.whyphoto}`}>
            {/* Cadrage centré sur les visages (haut de la photo carrée) */}
            <Image
              src={pourquoi.photo}
              alt={pourquoi.photoAlt}
              fill
              sizes="(max-width: 760px) 100vw, 563px"
              style={{ objectFit: 'cover', objectPosition: '50% 8%' }}
            />
            <div>
              <strong>{pourquoi.team}</strong>
              <p>{pourquoi.teamTagline}</p>
            </div>
          </div>
          <div className={s.benefits}>
            {pourquoi.benefits.map(({ number, title, text }) => (
              <div key={title} className={`${s.card} ${s.benefit}`}>
                <p className={`${s.num} ${s.blue}`}>{number}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
