import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { type ContactFormData } from '@/lib/types/kls3'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build')

const FIELD_LIMITS = {
  nom: 100,
  societe: 150,
  email: 254,
  telephone: 40,
  friction: 4000,
} as const

function cleanField(value: unknown, maxLength: number, allowLineBreaks = false): string | null {
  if (typeof value !== 'string') return null
  const cleaned = value.trim()
  const forbiddenCharacters = allowLineBreaks
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/
    : /[\u0000-\u001F\u007F]/
  if (!cleaned || cleaned.length > maxLength || forbiddenCharacters.test(cleaned)) {
    return null
  }
  return cleaned
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactFormData>
    if (typeof body.website === 'string' && body.website.trim()) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const nom = cleanField(body.nom, FIELD_LIMITS.nom)
    const societe = cleanField(body.societe, FIELD_LIMITS.societe)
    const email = cleanField(body.email, FIELD_LIMITS.email)
    const telephone = cleanField(body.telephone, FIELD_LIMITS.telephone)
    const friction = cleanField(body.friction, FIELD_LIMITS.friction, true)

    if (!nom || !societe || !email || !telephone || !friction) {
      return NextResponse.json(
        { error: 'Veuillez remplir les champs obligatoires (nom, société, email, téléphone, friction).' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
      return NextResponse.json(
        { error: 'Service indisponible. Écrivez-nous directement à contact@kls3-dev.com.' },
        { status: 503 }
      )
    }

    const emailHtml = `
      <h2>Nouvelle demande d'analyse — KLS3</h2>
      <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr><td><strong>Nom</strong></td><td>${escapeHtml(nom)}</td></tr>
        <tr><td><strong>Société</strong></td><td>${escapeHtml(societe)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Téléphone</strong></td><td>${escapeHtml(telephone)}</td></tr>
        <tr><td valign="top"><strong>Friction</strong></td><td>${escapeHtml(friction).replace(/\n/g, '<br>')}</td></tr>
      </table>
    `

    const { data, error } = await resend.emails.send({
      from: 'KLS3 <noreply@kls3-dev.com>',
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `[KLS3] Nouvelle demande d'analyse — ${societe}`,
      html: emailHtml,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi. Veuillez réessayer.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Une erreur inattendue est survenue.' }, { status: 500 })
  }
}
