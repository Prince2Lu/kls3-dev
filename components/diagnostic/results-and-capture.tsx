'use client'

import { useState, useTransition } from 'react'
import type { AutomationPack } from '@/lib/data/automation-packs'
import type { FrictionResult } from './friction-calculator'
import { submitDiagnostic } from '@/app/diagnostic/actions'

type Props = {
  result: FrictionResult
  selectedPacks: AutomationPack[]
}

export function ScoreCard({ result, selectedPacks }: Props) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-card p-8">
      <div className="mb-6 flex items-baseline gap-3">
        <span className="font-display text-5xl font-bold text-accent">{result.score}</span>
        <span className="text-sm text-foreground-muted">
          /100
          <br />
          Score de friction
        </span>
      </div>
      <div className="mb-7 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${result.score}%` }}
        />
      </div>

      <div className="flex justify-between border-t border-white/[0.07] py-3 text-sm">
        <span className="text-foreground-muted">Temps mobilisé</span>
        <span className="font-medium text-foreground">{result.heuresMois} h / mois</span>
      </div>
      <div className="flex justify-between border-t border-white/[0.07] py-3 text-sm">
        <span className="text-foreground-muted">Capacité administrative mobilisée</span>
        <span className="font-medium text-foreground">
          {result.coutAn.toLocaleString('fr-FR')} € / an
        </span>
      </div>

      {selectedPacks.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-xs font-medium uppercase text-foreground-muted" style={{ letterSpacing: '0.1em' }}>
            Packs sélectionnés
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedPacks.map((p) => (
              <span
                key={p.id}
                className="rounded-full px-3 py-1 text-xs text-accent"
                style={{ background: 'rgba(75,123,245,0.12)' }}
              >
                {p.titre}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="mt-6 border-t border-white/[0.07] pt-4 text-xs italic text-foreground-muted">
        Estimation indicative de modélisation, à affiner lors d&apos;un diagnostic approfondi
        avec votre cabinet.
      </p>
    </div>
  )
}

export function CaptureForm({ result, selectedPacks }: Props) {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ nom: '', cabinet: '', email: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      const res = await submitDiagnostic({
        ...form,
        score: result.score,
        heuresMois: result.heuresMois,
        coutAn: result.coutAn,
        parametres: result.parametres,
        packsSelectionnes: selectedPacks.map((p) => p.id),
      })
      setStatus(res.ok ? 'sent' : 'error')
    })
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-card p-8">
      <h3 className="mb-2 font-display text-xl font-bold text-foreground">
        Recevoir mon diagnostic personnalisé
      </h3>
      <p className="mb-6 text-sm font-light text-foreground-muted">
        Nous revenons vers vous sous 48h avec une lecture de vos résultats et des packs
        sélectionnés.
      </p>

      {status === 'sent' ? (
        <p className="rounded-lg border border-accent/30 bg-accent/10 p-4 text-sm text-foreground">
          Merci — votre diagnostic a bien été transmis. Nous revenons vers vous sous 48h.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            required
            placeholder="Nom et prénom"
            value={form.nom}
            onChange={(e) => setForm((p) => ({ ...p, nom: e.target.value }))}
            className="rounded-lg border border-white/[0.07] bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none"
          />
          <input
            type="text"
            required
            placeholder="Nom du cabinet"
            value={form.cabinet}
            onChange={(e) => setForm((p) => ({ ...p, cabinet: e.target.value }))}
            className="rounded-lg border border-white/[0.07] bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none"
          />
          <input
            type="email"
            required
            placeholder="Email professionnel"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="rounded-lg border border-white/[0.07] bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={isPending}
            className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50"
          >
            {isPending ? 'Envoi…' : 'Envoyer ma sélection'}
          </button>
          {status === 'error' && (
            <p className="text-xs text-red-400">Une erreur est survenue, merci de réessayer.</p>
          )}
        </form>
      )}
    </div>
  )
}
