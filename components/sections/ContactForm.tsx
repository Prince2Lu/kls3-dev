'use client'

import { useState, FormEvent } from 'react'
import { type ContactFormData } from '@/lib/types/kls3'

const inputClass =
  'w-full px-4 py-3 bg-[#0D0D0D] border border-kls-border rounded-lg text-kls-text placeholder:text-[rgba(240,237,232,0.35)] focus:outline-none focus:border-[#4B7BF5] transition-colors'

const labelClass = 'block mb-2'
const labelStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  fontWeight: 500 as const,
  color: '#F0EDE8',
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    nom: '',
    societe: '',
    email: '',
    telephone: '',
    friction: '',
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue')
      }
      setStatus('success')
      setFormData({ nom: '', societe: '', email: '', telephone: '', friction: '' })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nom" className={labelClass} style={labelStyle}>
            Nom <span className="text-kls-accent">*</span>
          </label>
          <input
            type="text"
            id="nom"
            required
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            className={inputClass}
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="societe" className={labelClass} style={labelStyle}>
            Société <span className="text-kls-accent">*</span>
          </label>
          <input
            type="text"
            id="societe"
            required
            value={formData.societe}
            onChange={(e) => setFormData({ ...formData, societe: e.target.value })}
            className={inputClass}
            placeholder="Nom de votre société"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className={labelClass} style={labelStyle}>
            Email <span className="text-kls-accent">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClass}
            placeholder="vous@societe.com"
          />
        </div>
        <div>
          <label htmlFor="telephone" className={labelClass} style={labelStyle}>
            Téléphone <span className="text-kls-accent">*</span>
          </label>
          <input
            type="tel"
            id="telephone"
            required
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            className={inputClass}
            placeholder="06 12 34 56 78"
          />
        </div>
      </div>

      <div>
        <label htmlFor="friction" className={labelClass} style={labelStyle}>
          Décrivez l&apos;opération ou la friction qui vous ralentit actuellement{' '}
          <span className="text-kls-accent">*</span>
        </label>
        <textarea
          id="friction"
          required
          rows={6}
          value={formData.friction}
          onChange={(e) => setFormData({ ...formData, friction: e.target.value })}
          className={`${inputClass} resize-none`}
          placeholder="Ex : reporting hebdomadaire consolidé à la main, relances clients manuelles…"
        />
      </div>

      {status === 'error' && (
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: 'rgba(239,68,68,0.1)',
            border: '0.5px solid rgba(239,68,68,0.3)',
            color: '#F87171',
            fontSize: '14px',
          }}
        >
          {errorMessage}
        </div>
      )}

      {status === 'success' && (
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: 'rgba(75,123,245,0.1)',
            border: '0.5px solid rgba(75,123,245,0.35)',
            color: '#F0EDE8',
            fontSize: '14px',
          }}
        >
          Demande envoyée. Nous revenons vers vous rapidement.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-full transition-colors hover:bg-[#3D6AE0] disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
        style={{
          backgroundColor: '#4B7BF5',
          color: '#FFFFFF',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 500,
          padding: '14px 28px',
        }}
      >
        {status === 'loading' ? 'Envoi en cours…' : 'Demander une première analyse'}
      </button>
    </form>
  )
}
