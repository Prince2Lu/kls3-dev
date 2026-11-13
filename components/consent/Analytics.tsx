'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { CONSENT_CHANGE_EVENT, GA_COOKIE_EXPIRES, GA_ID, readConsent, type ConsentValue } from '@/lib/consent'

// Google Analytics, injecté uniquement après consentement (kls3_consent=granted)
export default function Analytics() {
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    setGranted(readConsent() === 'granted')
    const handleChange = (event: Event) => {
      const value = (event as CustomEvent<ConsentValue>).detail
      if (value === 'granted') {
        ;(window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = false
        setGranted(true)
      }
    }
    window.addEventListener(CONSENT_CHANGE_EVENT, handleChange)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handleChange)
  }, [])

  if (!granted) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{cookie_expires:${GA_COOKIE_EXPIRES}});`}
      </Script>
    </>
  )
}
