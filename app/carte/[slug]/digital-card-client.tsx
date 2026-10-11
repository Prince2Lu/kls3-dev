'use client'

import { useEffect, useState } from 'react'
import { ERIC_PHOTO_DATA_URL } from './eric-photo'

const SALES_OS_URL =
  process.env.NEXT_PUBLIC_KLS3_SALES_OS_URL || 'https://kls3-sales-os.kls3-dev.com'

type CardProject = {
  label: string
  url: string
}

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void
}

function getVisitorId() {
  if (typeof window === 'undefined') return ''

  const key = 'kls3_card_visitor_id'
  const existing = window.localStorage.getItem(key)
  if (existing) return existing

  const created =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`

  window.localStorage.setItem(key, created)
  return created
}

function trackedOutboundUrl(
  slug: string,
  eventType: string,
  target: string,
  extra: Record<string, string> = {}
) {
  if (typeof window === 'undefined') return target

  const params = new URLSearchParams(window.location.search)
  const source = params.get('src') || params.get('utm_source') || 'direct'
  const campaign = params.get('utm_campaign') || params.get('campaign') || ''
  const visitorId = getVisitorId()
  const cardRef = params.get('ref') || ''

  const qs = new URLSearchParams({
    type: eventType,
    target,
    source,
    campaign,
    visitor: visitorId,
  })
  if (cardRef) qs.set('ref', cardRef)

  if (extra.project_label) qs.set('project_label', extra.project_label)

  return `/api/card-click/${encodeURIComponent(slug)}?${qs.toString()}`
}

function trackCardEvent(eventName: string, slug: string, extra: Record<string, string> = {}) {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  const source = params.get('src') || params.get('utm_source') || 'direct'
  const campaign = params.get('utm_campaign') || params.get('campaign') || ''
  const visitorId = getVisitorId()
  const cardRef = params.get('ref') || ''

  ;(window as GtagWindow).gtag?.('event', eventName, {
    card_slug: slug,
    card_source: source,
    card_campaign: campaign,
    page_location: window.location.href,
    page_referrer: document.referrer || '',
    ...extra,
  })

  const payload = JSON.stringify({
    eventType: eventName,
    visitorId,
    source,
    campaign,
    projectLabel: extra.project_label || '',
    pageReferrer: document.referrer || '',
    cardRef,
  })

  const endpoint = `/api/card-events/${encodeURIComponent(slug)}`

  if (navigator.sendBeacon) {
    const sent = navigator.sendBeacon(
      endpoint,
      new Blob([payload], { type: 'application/json' })
    )
    if (sent) return
  }

  void fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => undefined)
}

type PublicCard = {
  slug: string
  firstName: string
  lastName: string
  displayName: string
  title: string
  company: string
  email: string
  phone: string
  linkedin: string
  website: string
  photoUrl: string
  logoUrl: string
  bio: string
  projects: CardProject[]
}

const FALLBACK_CARDS: Record<string, PublicCard> = {
  eric: {
    slug: 'eric',
    firstName: 'Eric',
    lastName: 'Scarpino',
    displayName: 'Eric Scarpino',
    title: 'Directeur de missions',
    company: 'KLS3',
    email: 'eric@kls3-dev.com',
    phone: '',
    linkedin: 'https://www.linkedin.com/in/eric-scarpino',
    website: 'https://www.kls3-dev.com',
    photoUrl: '',
    logoUrl: '',
    bio: '',
    projects: [],
  },
  lilian: {
    slug: 'lilian',
    firstName: 'Lilian',
    lastName: 'Scarpino',
    displayName: 'Lilian Scarpino',
    title: 'Directeur commercial',
    company: 'KLS3',
    email: 'lilian@kls3-dev.com',
    phone: '',
    linkedin: 'https://www.linkedin.com/in/lilian-scarpino/',
    website: 'https://www.kls3-dev.com',
    photoUrl: '',
    logoUrl: '',
    bio: '',
    projects: [],
  },
}

export default function DigitalCardClient({ slug }: { slug: string }) {
  const [card, setCard] = useState<PublicCard | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetch(`${SALES_OS_URL}/api/public-cards/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Card API returned ${response.status}`)
        return response.json() as Promise<PublicCard>
      })
      .then((data) => {
        if (!cancelled) {
          setCard(data)
          trackCardEvent('card_view', data.slug)
        }
      })
      .catch(() => {
        if (cancelled) return

        const fallbackCard = FALLBACK_CARDS[slug.toLowerCase()]
        if (fallbackCard) {
          setCard(fallbackCard)
          trackCardEvent('card_view', fallbackCard.slug, { card_data_source: 'fallback' })
        } else {
          setError(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  if (error) {
    return (
      <section className="min-h-screen bg-[#0D0D0D] px-4 py-10 text-[#F0EDE8]">
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-[#111111] p-7 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#4B7BF5]">KLS3</p>
          <h1 className="mt-3 text-2xl font-bold">Carte indisponible</h1>
          <p className="mt-3 text-sm text-white/60">Impossible de charger cette carte pour le moment.</p>
        </div>
      </section>
    )
  }

  if (!card) {
    return (
      <section className="min-h-screen bg-[#0D0D0D] px-4 py-10 text-[#F0EDE8]">
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-[#111111] p-7 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#4B7BF5]">KLS3</p>
          <p className="mt-3 text-sm text-white/60">Chargement de la carte…</p>
        </div>
      </section>
    )
  }

  const visitorId = getVisitorId()
  const pageParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const cardRef = pageParams.get('ref') || ''
  const source = pageParams.get('src') || pageParams.get('utm_source') || 'card'
  const campaign = pageParams.get('campaign') || pageParams.get('utm_campaign') || ''
  const isAndroid =
    typeof navigator !== 'undefined' &&
    /Android|SamsungBrowser|Huawei|Xiaomi|OPPO|OnePlus/i.test(navigator.userAgent)
  const vcardBaseUrl = `${SALES_OS_URL}/api/public-cards/${encodeURIComponent(card.slug)}/vcard`
  const vcardQuery = new URLSearchParams({ src: source, visitor: visitorId })
  if (isAndroid) vcardQuery.set('platform', 'android')
  if (campaign) vcardQuery.set('campaign', campaign)
  if (cardRef) vcardQuery.set('ref', cardRef)
  const vcardUrl = `${vcardBaseUrl}?${vcardQuery.toString()}`
  const qrCardUrl = `https://www.kls3-dev.com/carte/${encodeURIComponent(card.slug)}?src=qr`
  const profilePhotoUrl =
    card.photoUrl || (card.slug === 'eric' ? ERIC_PHOTO_DATA_URL : '')
  const qrCodeUrl =
    `https://api.qrserver.com/v1/create-qr-code/?size=320x320&format=svg&data=${encodeURIComponent(qrCardUrl)}`
  const initials =
    (card.firstName ? card.firstName.charAt(0) : '') +
    (card.lastName ? card.lastName.charAt(0) : '')

  return (
    <section className="min-h-screen bg-[#0D0D0D] px-4 py-10 text-[#F0EDE8]">
      <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
        <div className="p-7">
          <div className="mb-6 flex justify-center">
            <img
              src={card.logoUrl || "/logo-kls3-512-transparent.png"}
              alt={card.company || "KLS3"}
              width={240}
              height={240}
              className="h-40 w-40 object-contain"
            />
          </div>

          <div className="flex items-center gap-4">
            {profilePhotoUrl ? (
              <img
                src={profilePhotoUrl}
                alt={card.displayName}
                width={80}
                height={80}
                className="h-20 w-20 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#4B7BF5] text-2xl font-bold text-white">
                {initials}
              </div>
            )}

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#4B7BF5]">KLS3</p>
              <h1 className="mt-1 text-2xl font-bold">{card.displayName}</h1>
              {(card.title || card.company) && (
                <p className="mt-1 text-sm text-white/60">
                  {[card.title, card.company].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>
          </div>

          {card.bio && <p className="mt-6 text-sm leading-6 text-white/70">{card.bio}</p>}

          <a
            href={vcardUrl}
            className="mt-7 block w-full rounded-xl bg-[#4B7BF5] px-4 py-3 text-center font-semibold text-white"
          >
            Ajouter à mes contacts
          </a>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <p className="text-sm font-medium text-white">Scanner pour ajouter le contact</p>
            <p className="mt-1 text-xs text-white/50">
              Scannez ce QR code avec un autre téléphone pour ouvrir la carte puis ajouter le contact.
            </p>
            <div className="mx-auto mt-4 w-fit rounded-2xl bg-white p-3">
              <img
                src={qrCodeUrl}
                alt={`QR code vCard de ${card.displayName}`}
                width={220}
                height={220}
                className="h-[220px] w-[220px]"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {card.phone && (
              <a
                href={`tel:${card.phone}`}
                onClick={() => trackCardEvent('phone_click', card.slug)}
                className="rounded-xl border border-white/10 px-3 py-3 text-center text-sm"
              >
                Appeler
              </a>
            )}
            {card.email && (
              <a
                href={`mailto:${card.email}`}
                onClick={() => trackCardEvent('email_click', card.slug)}
                className="rounded-xl border border-white/10 px-3 py-3 text-center text-sm"
              >
                Email
              </a>
            )}
          </div>

          <div className="mt-6 space-y-2">
            {card.linkedin && (
              <a
                href={trackedOutboundUrl(card.slug, 'linkedin_click', card.linkedin)}
                target="_blank"
                rel="noreferrer noopener"
                className="block rounded-xl border border-white/10 px-4 py-3 text-sm"
              >
                LinkedIn
              </a>
            )}
            {card.website && (
              <a
                href={trackedOutboundUrl(card.slug, 'website_click', card.website)}
                target="_blank"
                rel="noreferrer noopener"
                className="block rounded-xl border border-white/10 px-4 py-3 text-sm"
              >
                Site KLS3
              </a>
            )}
          </div>

          {card.projects && card.projects.length > 0 && (
            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Projets</p>
              <div className="space-y-2">
                {card.projects.map((project) => (
                  <a
                    key={`${project.label}-${project.url}`}
                    href={trackedOutboundUrl(card.slug, 'project_click', project.url, {
                      project_label: project.label,
                    })}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="block rounded-xl bg-white/[0.03] px-4 py-3 text-sm"
                  >
                    {project.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 px-7 py-4 text-center text-xs text-white/35">
          Moins de tâches manuelles. Plus de temps pour l&apos;essentiel.
        </div>
      </div>
    </section>
  )
}
