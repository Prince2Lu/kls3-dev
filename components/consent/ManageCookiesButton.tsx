'use client'

import { openConsentBanner } from '@/lib/consent'

// Rouvre le bandeau de consentement (retrait ou modification du choix)
export default function ManageCookiesButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openConsentBanner}>
      Gérer les cookies
    </button>
  )
}
