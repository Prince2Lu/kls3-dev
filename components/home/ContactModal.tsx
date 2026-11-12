'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { TurnstileWidget } from '@/components/ui/turnstile-widget'
import { contactForm, contactModal } from '@/lib/data/home'
import {
  CONTACT_SOURCES,
  OPEN_CONTACT_EVENT,
  type ContactSource,
  type OpenContactDetail,
} from '@/lib/home/contact'
import s from './home.module.css'

type FormState = {
  nom: string
  societe: string
  email: string
  telephone: string
  friction: string
  website: string
}

const emptyForm: FormState = { nom: '', societe: '', email: '', telephone: '', friction: '', website: '' }

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'

function isContactSource(value: string | undefined): value is ContactSource {
  return CONTACT_SOURCES.includes(value as ContactSource)
}

export default function ContactModal() {
  const [source, setSource] = useState<ContactSource | null>(null)
  const [formData, setFormData] = useState<FormState>(emptyForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const open = useCallback(({ source: nextSource, message }: OpenContactDetail) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setSource(nextSource)
    setStatus('idle')
    setErrorMessage('')
    setFormData((current) => ({ ...current, friction: message ?? '' }))
  }, [])

  const close = useCallback(() => {
    setSource(null)
    returnFocusRef.current?.focus()
  }, [])

  // Ouverture via openContactModal() ou via un bouton portant data-contact-source
  useEffect(() => {
    const handleOpen = (event: Event) => open((event as CustomEvent<OpenContactDetail>).detail)
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const trigger = event.target.closest<HTMLElement>('[data-contact-source]')
      const triggerSource = trigger?.dataset.contactSource
      if (!isContactSource(triggerSource)) return
      event.preventDefault()
      open({ source: triggerSource })
    }
    window.addEventListener(OPEN_CONTACT_EVENT, handleOpen)
    document.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener(OPEN_CONTACT_EVENT, handleOpen)
      document.removeEventListener('click', handleClick)
    }
  }, [open])

  useEffect(() => {
    if (!source) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstFieldRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [source])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      close()
      return
    }
    if (event.key !== 'Tab' || !dialogRef.current) return
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!turnstileToken) {
      setStatus('error')
      setErrorMessage(contactForm.turnstileMissing)
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source, turnstileToken }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || contactForm.genericError)
      }
      setStatus('success')
      setFormData(emptyForm)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : contactForm.genericError)
    } finally {
      setTurnstileToken('')
      setTurnstileResetKey((key) => key + 1)
    }
  }

  if (!source) return null

  const update = (field: keyof FormState) => (value: string) =>
    setFormData((current) => ({ ...current, [field]: value }))

  return (
    <div
      className={s.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close()
      }}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={dialogRef}
        className={s.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <button type="button" className={s.close} aria-label={contactForm.close} onClick={close}>
          <X size={18} />
        </button>
        <span className={s.tag}>{contactForm.tag}</span>
        <h2 id="contact-modal-title">{contactModal[source]}</h2>
        <p>{contactForm.intro}</p>

        {status === 'success' ? (
          <div className={`${s.formstatus} ${s.success}`} role="status">
            {contactForm.success}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={s.honeypot} aria-hidden="true">
              <label htmlFor="contact-website">Site web</label>
              <input
                type="text"
                id="contact-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(event) => update('website')(event.target.value)}
              />
            </div>
            <div className={s.fields}>
              <div className={s.field}>
                <label htmlFor="contact-nom">
                  {contactForm.nom} <span className={s.req}>*</span>
                </label>
                <input
                  ref={firstFieldRef}
                  id="contact-nom"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  value={formData.nom}
                  onChange={(event) => update('nom')(event.target.value)}
                />
              </div>
              <div className={s.field}>
                <label htmlFor="contact-societe">
                  {contactForm.societe} <span className={s.req}>*</span>
                </label>
                <input
                  id="contact-societe"
                  type="text"
                  required
                  maxLength={150}
                  autoComplete="organization"
                  value={formData.societe}
                  onChange={(event) => update('societe')(event.target.value)}
                />
              </div>
              <div className={s.field}>
                <label htmlFor="contact-email">
                  {contactForm.email} <span className={s.req}>*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  value={formData.email}
                  onChange={(event) => update('email')(event.target.value)}
                />
              </div>
              <div className={s.field}>
                <label htmlFor="contact-telephone">
                  {contactForm.telephone} <span className={s.req}>*</span>
                </label>
                <input
                  id="contact-telephone"
                  type="tel"
                  required
                  maxLength={40}
                  autoComplete="tel"
                  value={formData.telephone}
                  onChange={(event) => update('telephone')(event.target.value)}
                />
              </div>
              <div className={`${s.field} ${s.full}`}>
                <label htmlFor="contact-message">
                  {contactForm.message} <span className={s.req}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  maxLength={4000}
                  rows={5}
                  value={formData.friction}
                  onChange={(event) => update('friction')(event.target.value)}
                />
              </div>
            </div>

            <div className={s.turnstile}>
              <TurnstileWidget
                key={turnstileResetKey}
                action="contact"
                theme="light"
                onTokenChange={setTurnstileToken}
              />
            </div>

            {status === 'error' && (
              <div className={`${s.formstatus} ${s.error}`} role="alert">
                {errorMessage}
              </div>
            )}

            <div className={s.formactions}>
              <button
                type="submit"
                className={`${s.btn} ${s['btn-primary']}`}
                disabled={status === 'loading' || !turnstileToken}
              >
                {status === 'loading' ? contactForm.loading : contactForm.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
