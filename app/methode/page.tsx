'use client'

import { useEffect } from 'react'

export default function MethodeRedirectPage() {
  useEffect(() => {
    window.location.replace('/#methode')
  }, [])

  return (
    <p
      style={{
        padding: '160px 24px',
        textAlign: 'center',
        color: 'rgba(240, 237, 232, 0.6)',
        fontFamily: 'var(--font-body)',
        fontWeight: 300,
      }}
    >
      Redirection vers la méthode KLS3…
    </p>
  )
}
