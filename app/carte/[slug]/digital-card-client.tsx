'use client'

import { useEffect, useState } from 'react'

const SALES_OS_URL =
  process.env.NEXT_PUBLIC_KLS3_SALES_OS_URL || 'https://kls3-sales-os.kls3-dev.com'

type CardProject = {
  label: string
  url: string
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
  bio: string
  projects: CardProject[]
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
        if (!cancelled) setCard(data)
      })
      .catch(() => {
        if (!cancelled) setError(true)
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

  const vcardUrl = `${SALES_OS_URL}/api/public-cards/${encodeURIComponent(card.slug)}/vcard`
  const initials =
    (card.firstName ? card.firstName.charAt(0) : '') +
    (card.lastName ? card.lastName.charAt(0) : '')

  return (
    <section className="min-h-screen bg-[#0D0D0D] px-4 py-10 text-[#F0EDE8]">
      <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
        <div className="p-7">
          <div className="flex items-center gap-4">
            {card.photoUrl ? (
              <img
                src={card.photoUrl}
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

          <div className="mt-4 grid grid-cols-2 gap-3">
            {card.phone && (
              <a href={`tel:${card.phone}`} className="rounded-xl border border-white/10 px-3 py-3 text-center text-sm">
                Appeler
              </a>
            )}
            {card.email && (
              <a href={`mailto:${card.email}`} className="rounded-xl border border-white/10 px-3 py-3 text-center text-sm">
                Email
              </a>
            )}
          </div>

          <div className="mt-6 space-y-2">
            {card.linkedin && (
              <a href={card.linkedin} target="_blank" rel="noreferrer" className="block rounded-xl border border-white/10 px-4 py-3 text-sm">
                LinkedIn
              </a>
            )}
            {card.website && (
              <a href={card.website} target="_blank" rel="noreferrer" className="block rounded-xl border border-white/10 px-4 py-3 text-sm">
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
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
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
