import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { type ContactFormData } from '@/lib/types'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build')

const subjectLabels = {
  'gestion-de-projet': 'Gestion de projet',
  'transformation-digitale': 'Transformation digitale',
  'solution-saas': 'Solution SaaS',
  autre: 'Autre',
}

export async function POST(request: NextRequest) {
  try {
    // Vérification de la clé API Resend
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Service email non configuré. Contactez-nous directement à contact@kls3-dev.com' },
        { status: 503 }
      )
    }

    const body: ContactFormData = await request.json()

    // Validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { message: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { message: 'Adresse email invalide' },
        { status: 400 }
      )
    }

    if (!process.env.CONTACT_EMAIL) {
      console.error('Missing CONTACT_EMAIL environment variable')
      return NextResponse.json(
        { message: 'Configuration serveur manquante. Veuillez réessayer plus tard.' },
        { status: 500 }
      )
    }

    // Send email
    const subjectLabel = subjectLabels[body.subject] || 'Nouvelle demande'
    const emailSubject = `[kls3.dev] ${subjectLabel} — ${body.name}`

    const emailHtml = `
      <h2>Nouveau message depuis kls3.dev</h2>
      <p><strong>De:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      ${body.company ? `<p><strong>Entreprise:</strong> ${body.company}</p>` : ''}
      <p><strong>Sujet:</strong> ${subjectLabel}</p>
      <hr />
      <h3>Message:</h3>
      <p>${body.message.replace(/\n/g, '<br>')}</p>
    `

    const { data, error } = await resend.emails.send({
      from: 'kls3.dev <noreply@kls3-dev.com>',
      to: process.env.CONTACT_EMAIL,
      replyTo: body.email,
      subject: emailSubject,
      html: emailHtml,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { message: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Message envoyé avec succès', id: data?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { message: 'Une erreur inattendue est survenue' },
      { status: 500 }
    )
  }
}
