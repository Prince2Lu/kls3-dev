import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { type ContactFormData } from '@/lib/types/kls3'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build')

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
    const nom = body.nom?.trim()
    const societe = body.societe?.trim()
    const email = body.email?.trim()
    const telephone = body.telephone?.trim()
    const friction = body.friction?.trim()

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
