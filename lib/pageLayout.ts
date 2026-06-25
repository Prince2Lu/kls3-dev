import type { CSSProperties } from 'react'

export const PAGE_MAX_WIDTH = 1200

/** Contenu horizontal standard (pages secondaires, hero interne). */
export const pageContentStyle: CSSProperties = {
  maxWidth: PAGE_MAX_WIDTH,
  margin: '0 auto',
  paddingLeft: 'clamp(20px, 5vw, 80px)',
  paddingRight: 'clamp(20px, 5vw, 80px)',
}

/** Section homepage / conteneur vertical + horizontal. */
export const sectionContainerStyle: CSSProperties = {
  maxWidth: PAGE_MAX_WIDTH,
  margin: '0 auto',
  padding: '64px clamp(20px, 5vw, 80px)',
}

/** Padding vertical de section (pages secondaires). */
export const pageSectionVerticalStyle: CSSProperties = {
  ...pageContentStyle,
  paddingTop: 'clamp(64px, 8vw, 128px)',
  paddingBottom: 'clamp(64px, 8vw, 128px)',
}
