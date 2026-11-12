import Image from 'next/image'
import { pourquoi } from '@/lib/data/home'
import { hasPublicFile } from '@/lib/home/assets'
import s from './home.module.css'

export default function Pourquoi() {
  const hasPhoto = hasPublicFile(pourquoi.photo)

  return (
    <section id="equipe" className={`${s.section} ${s.why}`}>
      <div className={s.wrap}>
        <div className={s['title-space']}>
          <span className={s.tag}>{pourquoi.tag}</span>
          <h2>
            {pourquoi.titleLine1}
            <br />
            {pourquoi.titleLine2Start}
            <span style={{ color: '#7430ef' }}>{pourquoi.titleLine2Accent}</span>
          </h2>
          <p className={s.lead} style={{ marginInline: 'auto' }}>
            {pourquoi.lead}
          </p>
        </div>
        <div className={s.whygrid}>
          <div className={`${s.whyphoto} ${hasPhoto ? s.withphoto : ''}`}>
            {hasPhoto && (
              <Image
                src={pourquoi.photo}
                alt={pourquoi.team}
                fill
                sizes="(max-width: 760px) 100vw, 563px"
                style={{ objectFit: 'cover' }}
              />
            )}
            <div>
              <strong>{pourquoi.team}</strong>
              <p>{pourquoi.teamTagline}</p>
              {!hasPhoto && (
                <p style={{ fontSize: 12, marginTop: 20 }}>{pourquoi.photoPlaceholder}</p>
              )}
            </div>
          </div>
          <div>
            {pourquoi.benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className={s.benefit}>
                <div className={s.ic}>
                  <Icon size={21} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
