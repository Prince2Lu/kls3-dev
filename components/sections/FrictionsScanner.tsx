'use client'

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type KeyboardEvent,
  type RefObject,
} from 'react'

/**
 * FrictionsScanner — Section homepage KLS3 (responsive)
 * Module maître/détail interactif : 7 frictions opérationnelles.
 *
 * Responsive « container-based » : ResizeObserver sur la largeur du composant.
 *   > 720px : maître (liste verticale) + détail, 2 colonnes
 *   ≤ 720px : empilé, liste = onglets horizontaux scrollables
 */

const C = {
  bg: '#0D0D0D',
  accent: '#4B7BF5',
  text: '#F0EDE8',
  textMuted: 'rgba(240,237,232,.5)',
  syne: 'var(--font-display)',
  inter: 'var(--font-body)',
} as const

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
const BP = 720

interface FrictionsScannerProps {
  loadFonts?: boolean
}

function useContainerWidth(): [RefObject<HTMLElement | null>, number] {
  const ref = useRef<HTMLElement>(null)
  const [w, setW] = useState(0)

  useEffect(() => {
    if (!ref.current || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setW(e.contentRect.width)
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  return [ref, w]
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduce(mql.matches)
    on()
    mql.addEventListener('change', on)
    return () => mql.removeEventListener('change', on)
  }, [])
  return reduce
}

function useInjectStyles() {
  useEffect(() => {
    const id = 'kls3-frictions-styles'
    if (document.getElementById(id)) return
    const el = document.createElement('style')
    el.id = id
    el.textContent = `
      @keyframes kls3-barPulse { 0%,100%{transform:scaleY(.22)} 50%{transform:scaleY(1)} }
      @keyframes kls3-ticker  { 0%,100%{opacity:.55} 50%{opacity:1} }
      .kls3-row:focus-visible { outline:2px solid ${C.accent}; outline-offset:2px; }
      .kls3-list-h { scrollbar-width: none; }
      .kls3-list-h::-webkit-scrollbar { display: none; }
      @media (prefers-reduced-motion: reduce) {
        .kls3-bar { animation: none !important; transform: scaleY(.5) !important; }
        .kls3-dot { animation: none !important; }
      }
    `
    document.head.appendChild(el)
  }, [])
}

function useFonts(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const href =
      'https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap'
    if (document.querySelector(`link[href="${href}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }, [enabled])
}

export default function FrictionsScanner({ loadFonts = true }: FrictionsScannerProps) {
  const [sel, setSel] = useState(0)
  const [paused, setPaused] = useState(false)
  const [ref, width] = useContainerWidth()
  const reduceMotion = usePrefersReducedMotion()
  const compact = width > 0 && width <= BP
  const tiny = width > 0 && width <= 480

  useInjectStyles()
  useFonts(loadFonts)

  useEffect(() => {
    if (paused || reduceMotion) return
    const id = setInterval(() => setSel((s) => (s + 1) % FRICTIONS.length), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, reduceMotion])

  const active = FRICTIONS[sel]
  const select = useCallback((i: number) => {
    setSel(i)
    setPaused(true)
  }, [])

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>, i: number) => {
      const len = FRICTIONS.length
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        select((i + 1) % len)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        select((i - 1 + len) % len)
      } else if (e.key === 'Home') {
        e.preventDefault()
        select(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        select(len - 1)
      }
    },
    [select],
  )

  const bars = useRef(
    Array.from({ length: BAR_COUNT }, (_, i) => ({
      dur: (0.85 + (i % 6) * 0.13).toFixed(2),
      delay: (i * 0.07).toFixed(2),
    })),
  ).current

  return (
    <section id="frictions" className="scroll-mt-20" style={{ width: '100%' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '45px clamp(20px, 5vw, 80px)',
        }}
      >
        <div
          ref={ref as RefObject<HTMLDivElement>}
          onMouseLeave={() => setPaused(false)}
          style={{
            background: C.bg,
            borderRadius: 24,
            padding: compact ? '30px 20px' : '52px 48px',
            fontFamily: C.inter,
            color: C.text,
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: 24,
              marginBottom: 34,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <span
                  className="kls3-dot"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: C.accent,
                    animation: 'kls3-ticker 1.6s ease-in-out infinite',
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '.22em',
                    textTransform: 'uppercase',
                    color: C.accent,
                  }}
                >
                  Scanner opérationnel
                </span>
              </div>
              <h2
                style={{
                  fontFamily: C.syne,
                  fontWeight: 700,
                  fontSize: tiny ? 24 : compact ? 28 : 42,
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
              gridTemplateColumns: compact ? '1fr' : '400px 1fr',
              gap: compact ? 22 : 36,
              alignItems: 'stretch',
            }}
          >
            <div
              className={compact ? 'kls3-list-h' : undefined}
              role="tablist"
              aria-label="Frictions opérationnelles"
              style={{
                display: 'flex',
                flexDirection: compact ? 'row' : 'column',
                gap: compact ? 8 : 4,
                overflowX: compact ? 'auto' : 'visible',
                paddingBottom: compact ? 6 : 0,
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
                    onMouseEnter={() => select(i)}
                    onClick={() => select(i)}
                    onFocus={() => select(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    style={{
                      display: 'flex',
                      flexDirection: compact ? 'column' : 'row',
                      alignItems: compact ? 'flex-start' : 'center',
                      gap: compact ? 6 : 16,
                      flex: compact ? '0 0 auto' : undefined,
                      minWidth: compact ? 150 : undefined,
                      padding: '15px 18px',
                      borderRadius: 12,
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'background .35s ease, transform .35s ease, border-color .35s ease',
                      borderLeft: `2px solid ${isActive ? C.accent : 'transparent'}`,
                      background: isActive ? 'rgba(75,123,245,.10)' : 'transparent',
                      transform: isActive && !compact ? 'translateX(6px)' : 'none',
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
                        fontSize: compact ? 15 : 19,
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
                padding: compact ? 24 : 38,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: compact ? 0 : 430,
              }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: compact ? -18 : -30,
                  right: 10,
                  fontFamily: C.syne,
                  fontWeight: 800,
                  fontSize: compact ? 140 : 240,
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

              <div style={{ position: 'relative', marginTop: compact ? 22 : 0 }}>
                <div
                  style={{
                    fontFamily: C.syne,
                    fontWeight: 700,
                    fontSize: tiny ? 26 : compact ? 30 : 46,
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
                <div style={{ display: 'flex', gap: tiny ? 18 : 28, marginTop: 24 }}>
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
                  height: compact ? 54 : 74,
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
