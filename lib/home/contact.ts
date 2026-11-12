export const CONTACT_SOURCES = ['rendez-vous', 'demo', 'recherche', 'simulateur'] as const

export type ContactSource = (typeof CONTACT_SOURCES)[number]

export type OpenContactDetail = {
  source: ContactSource
  message?: string
}

export const OPEN_CONTACT_EVENT = 'kls3:open-contact'

// Ouvre la ContactModal montée sur la homepage
export function openContactModal(detail: OpenContactDetail) {
  window.dispatchEvent(new CustomEvent<OpenContactDetail>(OPEN_CONTACT_EVENT, { detail }))
}

// Format identique à toLocaleString('fr-FR'), mais déterministe entre serveur et navigateur
export function formatNumber(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
