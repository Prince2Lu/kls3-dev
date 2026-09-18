'use server'

import { Resend } from 'resend'
import { renderToBuffer } from '@react-pdf/renderer'
import { automationPacks } from '@/lib/data/automation-packs'
import { DiagnosticPdf } from '@/lib/pdf/diagnostic-pdf'
import { buildDiagnosticEmailHtml } from '@/lib/email/diagnostic-email-html'
import { verifyTurnstileToken } from '@/lib/security/turnstile'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build')

const FROM_ADDRESS = 'KLS3 <noreply@kls3-dev.com>'

export type DiagnosticSubmission = {
  nom: string
  cabinet: string
  email: string
  telephone: string
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
  /** ids des packs sélectionnés — voir lib/data/automation-packs.ts */
  packsSelectionnes: string[]
  website?: string
  turnstileToken?: string
}

export type DiagnosticActionResult = { ok: true } | { ok: false; error: string }

const FIELD_LIMITS = { nom: 100, cabinet: 150, email: 254, telephone: 40 } as const

function cleanField(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null
  const cleaned = value.trim()
  if (!cleaned || cleaned.length > maxLength || /[\r\n\u0000-\u001F\u007F]/.test(cleaned)) return null
  return cleaned
}

function isFiniteNumberBetween(value: unknown, min: number, max: number): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max
}

export async function submitDiagnostic(
  data: DiagnosticSubmission
): Promise<DiagnosticActionResult> {
  if (typeof data.website === 'string' && data.website.trim()) {
    return { ok: true }
  }

  const nom = cleanField(data.nom, FIELD_LIMITS.nom)
  const cabinet = cleanField(data.cabinet, FIELD_LIMITS.cabinet)
  const email = cleanField(data.email, FIELD_LIMITS.email)
  const telephone = cleanField(data.telephone, FIELD_LIMITS.telephone)

  if (!email || !cabinet || !nom || !telephone) {
    return { ok: false, error: 'Merci de renseigner tous les champs.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { ok: false, error: 'Adresse email invalide.' }
  }

  const p = data.parametres
  if (
    !p ||
    !isFiniteNumberBetween(p.clients, 10, 400) ||
    !isFiniteNumberBetween(p.outils, 1, 10) ||
    !isFiniteNumberBetween(p.relanceHeures, 0, 30) ||
    !isFiniteNumberBetween(p.dossiersDivergents, 0, 40) ||
    !isFiniteNumberBetween(p.tempsStatutMinutes, 0, 30) ||
    !isFiniteNumberBetween(p.tauxHoraire, 10, 120)
  ) {
    return { ok: false, error: 'Les données du diagnostic sont invalides.' }
  }

  const isHuman = await verifyTurnstileToken(data.turnstileToken, 'diagnostic')
  if (!isHuman) {
    return {
      ok: false,
      error: 'La vérification anti-robot a échoué. Veuillez réessayer.',
    }
  }

  const allowedPackIds = new Set(automationPacks.map((pack) => pack.id))
  const packsSelectionnes = Array.isArray(data.packsSelectionnes)
    ? [...new Set(data.packsSelectionnes.filter((id) => allowedPackIds.has(id)))].slice(
        0,
        automationPacks.length
      )
    : []
  const score = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (p.outils / 10) * 20 +
          (p.relanceHeures / 30) * 30 +
          (p.dossiersDivergents / 40) * 25 +
          (p.tempsStatutMinutes / 30) * 25
      )
    )
  )
  const heuresMois = Math.round(
    p.relanceHeures * 4.33 + p.dossiersDivergents * (p.tempsStatutMinutes / 60)
  )
  const coutAn = Math.round(heuresMois * 12 * p.tauxHoraire)

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    return {
      ok: false,
      error: 'Service indisponible. Écrivez-nous directement à contact@kls3-dev.com.',
    }
  }

  const date = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  try {
    const pdfBuffer = await renderToBuffer(
      DiagnosticPdf({
        nom,
        cabinet,
        email,
        telephone,
        score,
        heuresMois,
        coutAn,
        parametres: p,
        allPacks: automationPacks,
        selectedPackIds: packsSelectionnes,
        date,
      })
    )

    const attachments = [
      {
        filename: `diagnostic-kls3-${cabinet
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .toLowerCase()
          .slice(0, 80) || 'cabinet'}.pdf`,
        content: pdfBuffer,
      },
    ]

    const [internalResult, clientResult] = await Promise.all([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: process.env.CONTACT_EMAIL,
        replyTo: email,
        subject: `[Diagnostic] Nouvelle soumission — ${cabinet}`,
        html: buildDiagnosticEmailHtml({
          nom,
          cabinet,
          email,
          telephone,
          score,
          heuresMois,
          coutAn,
          parametres: p,
          allPacks: automationPacks,
          selectedPackIds: packsSelectionnes,
          audience: 'interne',
        }),
        attachments,
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        replyTo: process.env.CONTACT_EMAIL,
        subject: 'Votre diagnostic de friction opérationnelle — KLS3',
        html: buildDiagnosticEmailHtml({
          nom,
          cabinet,
          email,
          telephone,
          score,
          heuresMois,
          coutAn,
          parametres: p,
          allPacks: automationPacks,
          selectedPackIds: packsSelectionnes,
          audience: 'client',
        }),
        attachments,
      }),
    ])

    if (internalResult.error || clientResult.error) {
      console.error('[diagnostic] échec envoi interne/client', {
        internalError: internalResult.error,
        clientError: clientResult.error,
      })
      return { ok: false, error: "L'envoi a échoué, merci de réessayer." }
    }

    return { ok: true }
  } catch (err) {
    console.error('[diagnostic] échec envoi email', err)
    return { ok: false, error: "L'envoi a échoué, merci de réessayer." }
  }
}
