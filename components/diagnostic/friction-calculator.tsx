'use client'

import { useEffect, useState } from 'react'

export type FrictionResult = {
  score: number
  heuresMois: number
  coutAn: number
  parametres: {
    clients: number
    outils: number
    relanceHeures: number
    dossiersDivergents: number
    tempsStatutMinutes: number
    tauxHoraire: number
  }
}

type Props = {
  onResultChange: (result: FrictionResult) => void
}

const fields = [
  { key: 'clients', label: 'Nombre de dossiers/actes actifs', min: 10, max: 400, step: 10, default: 80, unit: '' },
  { key: 'outils', label: 'Outils / logiciels utilisés au quotidien', min: 1, max: 10, step: 1, default: 5, unit: '' },
  { key: 'relance', label: 'Heures / semaine — relances & ressaisie', min: 0, max: 30, step: 1, default: 8, unit: 'h' },
  { key: 'diverg', label: "Dossiers avec infos divergentes entre outils / mois", min: 0, max: 40, step: 1, default: 12, unit: '' },
  { key: 'statut', label: "Temps moyen pour retrouver le statut d'un dossier", min: 0, max: 30, step: 1, default: 8, unit: 'min' },
] as const

type Values = Record<(typeof fields)[number]['key'], number>

export function FrictionCalculator({ onResultChange }: Props) {
  const [values, setValues] = useState<Values>({
    clients: 80,
    outils: 5,
    relance: 8,
    diverg: 12,
    statut: 8,
  })
  const [taux, setTaux] = useState(35)

  useEffect(() => {
    const { outils, relance, diverg, statut } = values
    const score = Math.min(
      100,
      Math.max(
        0,
        Math.round((outils / 10) * 20 + (relance / 30) * 30 + (diverg / 40) * 25 + (statut / 30) * 25)
      )
    )
    const heuresMois = Math.round(relance * 4.33 + diverg * (statut / 60))
    const coutAn = Math.round(heuresMois * 12 * taux)

    onResultChange({
      score,
      heuresMois,
      coutAn,
      parametres: {
        clients: values.clients,
        outils: values.outils,
        relanceHeures: values.relance,
        dossiersDivergents: values.diverg,
        tempsStatutMinutes: values.statut,
        tauxHoraire: taux,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, taux])

  return (
    <div className="min-w-0">
      {fields.map((f) => (
        <div key={f.key} className="mb-7">
          <label className="mb-3 flex justify-between gap-3 text-base font-light text-foreground-muted">
            <span>{f.label}</span>
            <span className="shrink-0 text-lg font-semibold text-accent">
              {values[f.key]}
              {f.unit}
            </span>
          </label>
          <input
            type="range"
            min={f.min}
            max={f.max}
            step={f.step}
            value={values[f.key]}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, [f.key]: Number(e.target.value) }))
            }
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/[0.1] accent-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          />
        </div>
      ))}

      <div>
        <label className="mb-2 block text-base font-light text-foreground-muted">
          Coût horaire chargé moyen (€)
        </label>
        <input
          type="number"
          value={taux}
          min={10}
          max={120}
          onChange={(e) => setTaux(Number(e.target.value))}
          className="w-32 rounded-lg border border-white/[0.07] bg-card px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none"
        />
      </div>
    </div>
  )
}
