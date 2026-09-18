'use client'

import Script from 'next/script'
import { useCallback, useEffect, useRef } from 'react'

const TEST_SITE_KEY = '1x00000000000000000000AA'
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TEST_SITE_KEY

type TurnstileWidgetProps = {
  action: 'contact' | 'diagnostic'
  onTokenChange: (token: string) => void
}

type TurnstileOptions = {
  sitekey: string
  action: string
  theme: 'dark'
  language: 'fr'
  size: 'flexible'
  callback: (token: string) => void
  'expired-callback': () => void
  'error-callback': () => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string
      remove: (widgetId: string) => void
    }
  }
}

export function TurnstileWidget({ action, onTokenChange }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const callbackRef = useRef(onTokenChange)

  useEffect(() => {
    callbackRef.current = onTokenChange
  }, [onTokenChange])

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current) return

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      action,
      theme: 'dark',
      language: 'fr',
      size: 'flexible',
      callback: (token) => callbackRef.current(token),
      'expired-callback': () => callbackRef.current(''),
      'error-callback': () => callbackRef.current(''),
    })
  }, [action])

  useEffect(() => {
    renderWidget()

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [renderWidget])

  return (
    <div className="w-full">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div ref={containerRef} className="min-h-[65px] w-full" />
    </div>
  )
}
