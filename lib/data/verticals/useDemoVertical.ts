'use client'

import { useParams } from 'next/navigation'

/** Identifiant du vertical courant dans /demo/[vertical]/... */
export function useDemoVertical(): string {
  const params = useParams<{ vertical?: string }>()
  const value = params?.vertical
  return typeof value === 'string' ? value : Array.isArray(value) ? (value[0] ?? 'finance') : 'finance'
}
