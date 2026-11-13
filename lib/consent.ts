// Consentement aux cookies de mesure d'audience (Google Analytics), conforme CNIL

export const GA_ID = 'G-KTQXTLY7YL'
export const CONSENT_COOKIE = 'kls3_consent'
export type ConsentValue = 'granted' | 'denied'

// 6 mois (durée de validité du choix)
const CONSENT_MAX_AGE = 60 * 60 * 24 * 182
// Les cookies Google Analytics (_ga, _ga_*) expirent au bout de 13 mois au plus
export const GA_COOKIE_EXPIRES = 60 * 60 * 24 * 395

export const CONSENT_CHANGE_EVENT = 'kls3:consent-change'
export const OPEN_CONSENT_EVENT = 'kls3:open-consent'

export function readConsent(): ConsentValue | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`))
  return match ? (match[1] as ConsentValue) : null
}

export function writeConsent(value: ConsentValue) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure}`
  if (value === 'denied') clearAnalyticsCookies()
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_CHANGE_EVENT, { detail: value }))
}

// Retrait du consentement : coupe GA pour la session et supprime ses cookies
function clearAnalyticsCookies() {
  ;(window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true
  const names = document.cookie
    .split('; ')
    .map((cookie) => cookie.split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'))
  const host = window.location.hostname
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain ? `; Domain=${domain}` : ''}`
    }
  }
}

// Rouvre le bandeau (lien « Gérer les cookies » du footer)
export function openConsentBanner() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}
