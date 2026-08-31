'use client'

import type { SourceEventField } from '@/lib/types/demo'

interface SourceEventPanelProps {
  title: string
  subtitle: string
  fields: SourceEventField[]
  saved: boolean
  onSave: () => void
}

export default function SourceEventPanel({
  title,
  subtitle,
  fields,
  saved,
  onSave,
}: SourceEventPanelProps) {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8">
      <p
        className="mb-3 font-medium uppercase text-accent"
        style={{ fontSize: 11, letterSpacing: '0.16em' }}
      >
        <span className="mr-2.5 inline-block h-px w-7 bg-accent align-middle" />
        Saisie unique
      </p>

      <h2 className="font-display text-2xl font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-sm font-light text-foreground-muted">{subtitle}</p>
      <p className="mt-4 text-sm font-light text-foreground-muted">
        Une seule saisie. Les outils connectés se mettent à jour d&apos;eux-mêmes.
      </p>

      <form
        className="mt-8 space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
          if (!saved) onSave()
        }}
      >
        {fields.map((field) => (
          <label key={field.label} className="block">
            <span
              className="mb-1.5 block font-medium uppercase text-foreground-muted"
              style={{ fontSize: 11, letterSpacing: '0.08em' }}
            >
              {field.label}
            </span>
            <input
              type="text"
              defaultValue={field.value}
              readOnly={saved}
              className="w-full rounded-xl border border-white/[0.07] bg-[#0D0D0D] px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-accent"
              style={{ opacity: saved ? 0.7 : 1 }}
            />
          </label>
        ))}

        <button
          type="submit"
          disabled={saved}
          className="mt-2 w-full rounded-[100px] px-6 py-3 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          style={{ background: saved ? 'rgba(75,123,245,0.45)' : '#4B7BF5' }}
        >
          {saved ? 'Dossier enregistré' : 'Enregistrer le dossier'}
        </button>
      </form>
    </section>
  )
}