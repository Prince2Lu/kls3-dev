'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import s from '@/components/home/home.module.css'
import { OPEN_CONSENT_EVENT, readConsent, writeConsent, type ConsentValue } from '@/lib/consent'

// Bandeau de consentement : « Refuser » et « Accepter » ont le même poids visuel (exigence CNIL)
export default function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!readConsent()) setOpen(true)
    const handleOpen = () => setOpen(true)
    window.addEventListener(OPEN_CONSENT_EVENT, handleOpen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, handleOpen)
  }, [])

  if (!open) return null

  const choose = (value: ConsentValue) => {
    writeConsent(value)
    setOpen(false)
  }

  return (
    <div className={`${s.root} ${s.chrome}`}>
      <section className={s.consent} role="region" aria-label="Consentement aux cookies">
        {/* Version courte sur petit écran (< 760 px de large ou < 800 px de haut), voir home.module.css */}
        <p>
          <span className={s.consentlong}>
            Nous utilisons des cookies de mesure d&apos;audience (Google Analytics) pour améliorer le site.
            Vous pouvez les accepter ou les refuser.
          </span>
          <span className={s.consentshort}>Nous utilisons des cookies de mesure d&apos;audience.</span>{' '}
          <Link href="/politique-de-confidentialite#cookies">En savoir plus</Link>
        </p>
        <div className={s.consentactions}>
          <button type="button" className={`${s.btn} ${s['btn-outline']}`} onClick={() => choose('denied')}>
            Refuser
          </button>
          <button type="button" className={`${s.btn} ${s['btn-outline']}`} onClick={() => choose('granted')}>
            Accepter
          </button>
        </div>
      </section>
    </div>
  )
}
