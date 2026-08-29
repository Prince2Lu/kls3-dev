'use server'

import { Resend } from 'resend'
import { renderToBuffer } from '@react-pdf/renderer'
import { automationPacks } from '@/lib/data/automation-packs'
import { DiagnosticPdf } from '@/lib/pdf/diagnostic-pdf'
import { buildDiagnosticEmailHtml } from '@/lib/email/diagnostic-email-html'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build')

const FROM_ADDRESS = 'KLS3 <noreply@kls3-dev.com>'

export type DiagnosticSubmission = {
  nom: string
  cabinet: string
  email: string
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
}

export type DiagnosticActionResult = { ok: true } | { ok: false; error: string }

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
        nom: data.nom,
        cabinet: data.cabinet,
        email: data.email,
        score: data.score,
        heuresMois: data.heuresMois,
        coutAn: data.coutAn,
        parametres: data.parametres,
        allPacks: automationPacks,
        selectedPackIds: data.packsSelectionnes,
        date,
      })
    )

    const attachments = [
      {
        filename: `diagnostic-kls3-${data.cabinet.replace(/\s+/g, '-').toLowerCase()}.pdf`,
        content: pdfBuffer,
      },
    ]

    const { error: clientError } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: data.email,
      subject: 'Votre diagnostic de friction opérationnelle — KLS3',
      html: buildDiagnosticEmailHtml({
        nom: data.nom,
        cabinet: data.cabinet,
        score: data.score,
        heuresMois: data.heuresMois,
        coutAn: data.coutAn,
        parametres: data.parametres,
        allPacks: automationPacks,
        selectedPackIds: data.packsSelectionnes,
        audience: 'client',
      }),
      attachments,
    })

    if (clientError) {
      console.error('[diagnostic] échec envoi email client', clientError)
      return { ok: false, error: "L'envoi a échoué, merci de réessayer." }
    }

    const { error: internalError } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: process.env.CONTACT_EMAIL,
      replyTo: data.email,
      subject: `[Diagnostic] Nouvelle soumission — ${data.cabinet}`,
      html: buildDiagnosticEmailHtml({
        nom: data.nom,
        cabinet: data.cabinet,
        score: data.score,
        heuresMois: data.heuresMois,
        coutAn: data.coutAn,
        parametres: data.parametres,
        allPacks: automationPacks,
        selectedPackIds: data.packsSelectionnes,
        audience: 'interne',
      }),
      attachments,
    })

    if (internalError) {
      console.error('[diagnostic] échec envoi email interne', internalError)
      return { ok: false, error: "L'envoi a échoué, merci de réessayer." }
    }

    return { ok: true }
  } catch (err) {
    console.error('[diagnostic] échec envoi email', err)
    return { ok: false, error: "L'envoi a échoué, merci de réessayer." }
  }
}
