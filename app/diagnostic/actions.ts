'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build')

export type DiagnosticSubmission = {
  nom: string
  cabinet: string
  email: string
  score: number
  heuresMois: number
  coutAn: number
  packsSelectionnes: string[]
}

export type DiagnosticActionResult = { ok: true } | { ok: false; error: string }

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildEmailHtml(data: DiagnosticSubmission): string {
  const packs = data.packsSelectionnes.length
    ? data.packsSelectionnes.map(escapeHtml).join(', ')
    : 'Aucun'

  return `
      <h2>Nouveau diagnostic — KLS3</h2>
      <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr><td><strong>Nom</strong></td><td>${escapeHtml(data.nom)}</td></tr>
        <tr><td><strong>Cabinet</strong></td><td>${escapeHtml(data.cabinet)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td><strong>Score de friction</strong></td><td>${data.score}/100</td></tr>
        <tr><td><strong>Temps mobilisé</strong></td><td>${data.heuresMois} h / mois</td></tr>
        <tr><td><strong>Capacité administrative</strong></td><td>${data.coutAn.toLocaleString('fr-FR')} € / an</td></tr>
        <tr><td valign="top"><strong>Packs sélectionnés</strong></td><td>${packs}</td></tr>
      </table>
    `
}

/**
 * Réceptionne un diagnostic soumis depuis /diagnostic.
 * Envoi via Resend — même clé (RESEND_API_KEY) et même pattern que /api/contact.
 */
export async function submitDiagnostic(
  data: DiagnosticSubmission
): Promise<DiagnosticActionResult> {
  if (!data.email || !data.cabinet || !data.nom) {
    return { ok: false, error: 'Merci de renseigner tous les champs.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { ok: false, error: 'Adresse email invalide.' }
  }

  // eslint-disable-next-line no-console
  console.log('[diagnostic] nouvelle soumission', {
    ...data,
    packsSelectionnes: data.packsSelectionnes.join(', '),
  })

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    // Mêmes variables que /api/contact. Sans elles (dev local), on journalise seulement.
    return { ok: true }
  }

  const { error } = await resend.emails.send({
    from: 'KLS3 <noreply@kls3-dev.com>',
    to: process.env.CONTACT_EMAIL,
    replyTo: data.email,
    subject: `[KLS3] Diagnostic — ${data.cabinet}`,
    html: buildEmailHtml(data),
  })

  if (error) {
    console.error('Resend error:', error)
    return { ok: false, error: "Erreur lors de l'envoi. Veuillez réessayer." }
  }

  return { ok: true }
}
