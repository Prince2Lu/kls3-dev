'use client'

import { useState, useEffect, useRef, useCallback, type KeyboardEvent } from 'react'

/**
 * FrictionsScanner — Section homepage KLS3
 * Module maître/détail interactif : 7 frictions opérationnelles.
 *
 * - Auto-play (3,2 s), pause au survol, reprise à la sortie souris.
 * - Navigation clavier (flèches haut/bas, Home/End).
 * - Respecte prefers-reduced-motion.
 * - Responsive : colonnes empilées sous 900px.
 *
 * Polices Syne + Inter chargées via globals.css.
 */

/* ---------------------------------- Tokens ---------------------------------- */
const C = {
  bg: '#0D0D0D',
  accent: '#4B7BF5',
  text: '#F0EDE8',
  textMuted: 'rgba(240,237,232,.5)',
  border: 'rgba(240,237,232,.1)',
  syne: 'var(--font-display)',
  inter: 'var(--font-body)',
} as const

/* ---------------------------------- Données --------------------------------- */
interface Friction {
  n: string
  t: string
  cat: string
  impact: string
  freq: string
  d: string
}

const FRICTIONS: Friction[] = [
  { n: '01', t: 'Reporting manuel', cat: 'Temps', impact: 'Élevé', freq: 'Hebdomadaire', d: 'Des heures chaque semaine à compiler des chiffres à la main, dans des fichiers qui ne se parlent pas.' },
  { n: '02', t: 'Données dispersées', cat: 'Information', impact: 'Élevé', freq: 'Permanente', d: "L'information vit dans dix outils différents. Personne n'a la vue d'ensemble au moment où il la faut." },
  { n: '03', t: 'Relances répétitives', cat: 'Process', impact: 'Moyen', freq: 'Quotidienne', d: 'Les mêmes e-mails, les mêmes rappels, en boucle. Du travail sans fin et sans valeur ajoutée.' },
  { n: '04', t: 'Dépendance humaine', cat: 'Risque', impact: 'Critique', freq: 'Ponctuelle', d: "Quand une personne clé s'absente, tout s'arrête. Le savoir n'existe que dans sa tête." },
  { n: '05', t: 'Manque de visibilité', cat: 'Pilotage', impact: 'Élevé', freq: 'Permanente', d: "Les problèmes se découvrent trop tard — une fois qu'ils ont déjà coûté cher." },
  { n: '06', t: 'Validations lentes', cat: 'Décision', impact: 'Moyen', freq: 'Quotidienne', d: 'Chaque décision attend une signature qui traîne. Les dossiers dorment dans les boîtes de réception.' },
  { n: '07', t: 'Onboarding fragile', cat: 'Montée en charge', impact: 'Moyen', freq: 'À chaque arrivée', d: "Chaque recrue réapprend tout de zéro. Le process dépend de qui forme, pas d'un système." },
]

const AUTOPLAY_MS = 3200
const BAR_COUNT = 34

interface BarConfig {
  dur: string
  delay: string
}

/* ----------------------------------- Hooks ---------------------------------- */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/* ---------------------- Styles globaux (keyframes + reset) ------------------- */
function StyleInjector() {
  useEffect(() => {
    const id = 'kls3-frictions-styles'
    if (document.getElementById(id)) return
    const el = document.createElement('style')
    el.id = id
    el.textContent = `
      @keyframes kls3-barPulse { 0%,100%{transform:scaleY(.22)} 50%{transform:scaleY(1)} }
      @keyframes kls3-ticker  { 0%,100%{opacity:.55} 50%{opacity:1} }
      .kls3-row:focus-visible { outline:2px solid ${C.accent}; outline-offset:2px; }
      @media (prefers-reduced-motion: reduce) {
        .kls3-bar { animation: none !important; transform: scaleY(.5) !important; }
        .kls3-dot { animation: none !important; }
      }
    `
    document.head.appendChild(el)
  }, [])
  return null
}

/* -------------------------------- Composant --------------------------------- */
export default function FrictionsScanner() {
  const [sel, setSel] = useState(0)
  const [paused, setPaused] = useState(false)
  const stacked = useMediaQuery('(max-width: 900px)')
  const narrow = useMediaQuery('(max-width: 600px)')
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    if (paused || reduceMotion) return
    const id = setInterval(
      () => setSel((s) => (s + 1) % FRICTIONS.length),
      AUTOPLAY_MS
    )
    return () => clearInterval(id)
  }, [paused, reduceMotion])

  const active = FRICTIONS[sel]

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      setSel((s) => (s + 1) % FRICTIONS.length)
      setPaused(true)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      setSel((s) => (s - 1 + FRICTIONS.length) % FRICTIONS.length)
      setPaused(true)
    } else if (e.key === 'Home') {
      e.preventDefault()
      setSel(0)
      setPaused(true)
    } else if (e.key === 'End') {
      e.preventDefault()
      setSel(FRICTIONS.length - 1)
      setPaused(true)
    }
  }, [])

  const bars = useRef<BarConfig[]>(
    Array.from({ length: BAR_COUNT }, (_, i) => ({
      dur: (0.85 + (i % 6) * 0.13).toFixed(2),
      delay: (i * 0.07).toFixed(2),
    }))
  ).current

  return (
    <section
      id="frictions"
      className="border-b border-kls-border scroll-mt-20"
      style={{ width: '100%' }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '64px clamp(20px, 5vw, 80px)',
        }}
      >
    <div
      onMouseLeave={() => setPaused(false)}
      style={{
        background: C.bg,
        borderRadius: 24,
        padding: stacked ? '22px' : '52px 48px',
        width: '100%',
        fontFamily: C.inter,
        color: C.text,
        boxSizing: 'border-box',
      }}
    >
      <StyleInjector />

      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 24,
          marginBottom: stacked ? 28 : 34,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 22,
              fontSize: 12,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#4B7BF5',
              fontWeight: 500,
            }}
          >
            <span style={{ width: 28, height: 1, background: '#4B7BF5', display: 'inline-block' }} />
            Scanner opérationnel
          </div>
          <h2
            style={{
              fontFamily: C.syne,
              fontWeight: 700,
              fontSize: stacked ? 30 : 42,
              lineHeight: 1.05,
              letterSpacing: '-.02em',
              color: C.text,
              margin: 0,
              maxWidth: 560,
            }}
          >
            Sept points de friction, passés au crible.
          </h2>
        </div>
        <div
          style={{
            fontFamily: C.syne,
            fontWeight: 700,
            fontSize: 18,
            color: 'rgba(240,237,232,.35)',
            letterSpacing: '.05em',
            whiteSpace: 'nowrap',
          }}
        >
          {active.n} <span style={{ color: 'rgba(240,237,232,.2)' }}>/ 07</span>
        </div>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: stacked ? '1fr' : '400px 1fr',
          gap: stacked ? 24 : 36,
          alignItems: 'stretch',
        }}
      >
        <div
          role="tablist"
          aria-label="Frictions opérationnelles"
          style={{
            display: 'grid',
            gridTemplateColumns: stacked ? (narrow ? '1fr' : '1fr 1fr') : '1fr',
            gap: 4,
          }}
        >
          {FRICTIONS.map((f, i) => {
            const isActive = i === sel
            return (
              <div
                key={f.n}
                role="tab"
                tabIndex={0}
                aria-selected={isActive}
                className="kls3-row"
                onMouseEnter={() => { setSel(i); setPaused(true) }}
                onFocus={() => { setSel(i); setPaused(true) }}
                onClick={() => { setSel(i); setPaused(true) }}
                onKeyDown={onKeyDown}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '15px 18px',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'background .35s ease, transform .35s ease, border-color .35s ease',
                  borderLeft: `2px solid ${isActive ? C.accent : 'transparent'}`,
                  background: isActive ? 'rgba(75,123,245,.10)' : 'transparent',
                  transform: isActive ? 'translateX(6px)' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: C.syne,
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: '.05em',
                    transition: 'color .35s ease',
                    color: isActive ? C.accent : 'rgba(240,237,232,.32)',
                  }}
                >
                  {f.n}
                </span>
                <span
                  style={{
                    fontFamily: C.syne,
                    fontWeight: 600,
                    fontSize: 19,
                    letterSpacing: '-.01em',
                    transition: 'color .35s ease',
                    color: isActive ? C.text : C.textMuted,
                  }}
                >
                  {f.t}
                </span>
              </div>
            )
          })}
        </div>

        <div
          role="tabpanel"
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 18,
            border: '1px solid rgba(75,123,245,.22)',
            background: 'linear-gradient(165deg, rgba(75,123,245,.08), rgba(75,123,245,.01) 60%)',
            padding: stacked ? 26 : 38,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 430,
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -30,
              right: 10,
              fontFamily: C.syne,
              fontWeight: 800,
              fontSize: stacked ? 150 : 240,
              lineHeight: 0.8,
              color: 'rgba(75,123,245,.07)',
              pointerEvents: 'none',
            }}
          >
            {active.n}
          </div>

          <div style={{ position: 'relative', display: 'flex', gap: 10 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '.13em',
                textTransform: 'uppercase',
                color: C.accent,
                border: '1px solid rgba(75,123,245,.4)',
                padding: '5px 12px',
                borderRadius: 999,
              }}
            >
              {active.cat}
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            <div
              style={{
                fontFamily: C.syne,
                fontWeight: 700,
                fontSize: stacked ? 32 : 46,
                lineHeight: 1.04,
                letterSpacing: '-.02em',
                color: C.text,
                maxWidth: 520,
              }}
            >
              {active.t}
            </div>
            <div
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: 'rgba(240,237,232,.62)',
                marginTop: 16,
                maxWidth: 540,
              }}
            >
              {active.d}
            </div>
            <div style={{ display: 'flex', gap: 28, marginTop: 24 }}>
              <Metric label="Impact" value={active.impact} valueColor={C.accent} />
              <div style={{ width: 1, background: 'rgba(240,237,232,.12)' }} />
              <Metric label="Fréquence" value={active.freq} valueColor={C.text} />
            </div>
          </div>

          <div
            aria-hidden
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              gap: 5,
              height: 74,
              marginTop: 24,
            }}
          >
            {bars.map((b, i) => (
              <div
                key={i}
                className="kls3-bar"
                style={{
                  flex: 1,
                  height: '100%',
                  transformOrigin: 'bottom',
                  borderRadius: '3px 3px 0 0',
                  background: 'linear-gradient(180deg, #4B7BF5, rgba(75,123,245,.2))',
                  animation: `kls3-barPulse ${b.dur}s ease-in-out infinite`,
                  animationDelay: `${b.delay}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
      </div>
    </section>
  )
}

interface MetricProps {
  label: string
  value: string
  valueColor: string
}

function Metric({ label, value, valueColor }: MetricProps) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '.13em',
          textTransform: 'uppercase',
          color: 'rgba(240,237,232,.4)',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: C.syne,
          fontWeight: 600,
          fontSize: 18,
          color: valueColor,
          marginTop: 4,
        }}
      >
        {value}
      </div>
    </div>
  )
}
