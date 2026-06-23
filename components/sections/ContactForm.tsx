'use client'

import { useState, FormEvent } from 'react'
import { Send } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import { type ContactFormData } from '@/lib/types'

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    subject: 'autre',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'autre',
        message: '',
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue')
    }
  }

  return (
    <GlassCard accent="purple" className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Nom complet <span className="text-brand-purple">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
              placeholder="Jean Dupont"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email <span className="text-brand-purple">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
              placeholder="jean.dupont@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
            Entreprise
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
            placeholder="Nom de votre entreprise"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
            Sujet <span className="text-brand-purple">*</span>
          </label>
          <select
            id="subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value as ContactFormData['subject'] })}
            className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
          >
            <option value="gestion-de-projet">Gestion de projet</option>
            <option value="transformation-digitale">Transformation digitale</option>
            <option value="solution-saas">Solution SaaS</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Message <span className="text-brand-purple">*</span>
          </label>
          <textarea
            id="message"
            required
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 resize-none"
            placeholder="Décrivez votre projet ou votre besoin..."
          />
        </div>

        {status === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {errorMessage.includes('contact@kls3-dev.com') ? (
              <div>
                Service email temporairement indisponible. Contactez-nous directement à{' '}
                <a
                  href="mailto:contact@kls3-dev.com"
                  className="text-brand-cyan hover:text-brand-cyan-light underline transition-colors"
                >
                  contact@kls3-dev.com
                </a>
              </div>
            ) : (
              errorMessage
            )}
          </div>
        )}

        {status === 'success' && (
          <div className="p-4 bg-brand-green/10 border border-brand-green/20 rounded-lg text-brand-green text-sm">
            Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-brand-purple to-brand-cyan text-white rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              Envoyer votre message
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </GlassCard>
  )
}
