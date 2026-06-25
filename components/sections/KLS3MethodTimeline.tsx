'use client'

import { useState, useEffect, useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'

/**
 * KLS3 — Méthode en 4 étapes · Direction « Chronos »
 * Timeline verticale animée : spine de progression, numéros expressifs,
 * étapes qui se révèlent, autoplay + timer par étape, avant → après.
 *
 * Drop-in Next.js 14 (App Router). Aucune dépendance externe.
 * Fonts attendues : Syne (titres) + Inter (corps) — chargées au niveau du layout.
 */

type Step = {
  n: string
  verb: string
  tag: string
  from: string
  to: string
  desc: string
}

const STEPS: Step[] = [
  { n: '01', verb: 'Identifier', tag: 'Diagnostic', from: 'Friction', to: 'Signal', desc: 'Les frictions invisibles qui ralentissent réellement vos équipes.' },
  { n: '02', verb: 'Simplifier', tag: 'Clarté', from: 'Complexité', to: 'Flux', desc: 'Les opérations inutiles ou fragiles, clarifier les flux.' },
  { n: '03', verb: 'Automatiser', tag: 'Levier', from: 'Répétition', to: 'Cadence', desc: 'Les tâches répétitives à faible valeur ajoutée.' },
  { n: '04', verb: 'Piloter', tag: 'Temps réel', from: 'Angle mort', to: 'Visibilité', desc: 'Les opérations en temps réel avec visibilité complète.' },
]

const DUR = 4200

const C = {
  bg: '#0D0D0D',
  card: '#111111',
  text: '#F0EDE8',
  accent: '#4B7BF5',
  muted: 'rgba(240,237,232,0.46)',
  line: 'rgba(240,237,232,0.12)',
} as const

export default function KLS3MethodTimeline() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!playing) return
    timer.current = setTimeout(
      () => setActive((a) => (a + 1) % STEPS.length),
      DUR
    )
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [active, playing])

  const fill = (active / (STEPS.length - 1)) * 100

  return (
    <section
      id="methode"
      className="kls-tl border-b border-kls-border scroll-mt-20"
      style={{
        width: '100%',
        position: 'relative',
        color: C.text,
        fontFamily: 'var(--font-body)',
        fontWeight: 300,
        containerType: 'inline-size',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '64px clamp(20px, 5vw, 80px)',
        }}
      >
      <style>{`
        .kls-tl *{box-sizing:border-box;}
        .kls-tl-row:focus-visible{outline:1px solid ${C.accent};outline-offset:4px;}
        @container (max-width: 768px){
          .kls-tl-head{flex-direction:column;align-items:flex-start;gap:24px;}
          .kls-tl-row{grid-template-columns:30px 1fr !important;}
          .kls-tl-num{font-size:clamp(40px,16cqw,72px) !important;}
          .kls-tl-meta{display:none !important;}
        }
        @keyframes klsTimer{from{transform:scaleX(0)}to{transform:scaleX(1)}}
      `}</style>

      <div
        className="kls-tl-head"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 32,
          marginBottom: 'clamp(48px,6vw,80px)',
        }}
      >
        <div>
          <SectionLabel>La méthode KLS3</SectionLabel>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              margin: 0,
              fontSize: 'clamp(32px, 5vw, 60px)',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              maxWidth: '14ch',
            }}
          >
            Quatre temps,
            <br />
            une transformation.
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 6 }}>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause' : 'Lecture'}
            style={{
              width: 44,
              height: 44,
              borderRadius: 100,
              flexShrink: 0,
              border: `1px solid ${C.line}`,
              background: 'transparent',
              color: C.text,
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
              transition: 'border-color .25s, background .25s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.line }}
          >
            {playing ? (
              <span style={{ display: 'flex', gap: 3 }}>
                <i style={{ width: 3, height: 13, background: C.text }} />
                <i style={{ width: 3, height: 13, background: C.text }} />
              </span>
            ) : (
              <span
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `11px solid ${C.text}`,
                  borderTop: '7px solid transparent',
                  borderBottom: '7px solid transparent',
                  marginLeft: 3,
                }}
              />
            )}
          </button>

          <div style={{ display: 'flex', gap: 8 }}>
            {STEPS.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={s.verb}
                style={{
                  height: 5,
                  width: i === active ? 30 : 14,
                  borderRadius: 100,
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  background: i === active ? C.accent : C.line,
                  transition: 'width .4s cubic-bezier(.4,0,.2,1), background .3s',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 14, top: 8, bottom: 8, width: 1, background: C.line }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: `${fill}%`,
              background: C.accent,
              transition: 'height .7s cubic-bezier(.4,0,.2,1)',
            }}
          />
        </div>

        {STEPS.map((s, i) => {
          const on = i === active
          const past = i < active
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="kls-tl-row"
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '30px 1fr',
                gap: 'clamp(20px,3vw,48px)',
                alignItems: 'start',
                width: '100%',
                textAlign: 'left',
                border: 'none',
                background: 'transparent',
                color: 'inherit',
                cursor: 'pointer',
                padding: 'clamp(20px,2.6vw,34px) 0',
                borderTop: i === 0 ? 'none' : `1px solid ${C.line}`,
                opacity: on ? 1 : past ? 0.62 : 0.34,
                transition: 'opacity .5s ease',
              }}
            >
              <div style={{ position: 'relative', height: 30, display: 'grid', placeItems: 'center' }}>
                <span
                  style={{
                    width: on ? 14 : 9,
                    height: on ? 14 : 9,
                    borderRadius: 100,
                    background: on || past ? C.accent : C.bg,
                    border: `1px solid ${on || past ? C.accent : 'rgba(240,237,232,0.3)'}`,
                    boxShadow: on ? '0 0 0 5px rgba(75,123,245,0.16)' : 'none',
                    transition: 'all .4s cubic-bezier(.4,0,.2,1)',
                    position: 'relative',
                    zIndex: 2,
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(16px,3vw,40px)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(14px,2vw,28px)', flex: '1 1 320px', minWidth: 0 }}>
                  <span
                    className="kls-tl-num"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 'clamp(48px, 7vw, 104px)',
                      lineHeight: 0.85,
                      letterSpacing: '-0.03em',
                      color: on ? C.accent : 'transparent',
                      WebkitTextStroke: on ? '0' : '1px rgba(240,237,232,0.3)',
                      transition: 'color .45s ease',
                      flexShrink: 0,
                    }}
                  >
                    {s.n}
                  </span>
                  <div style={{ paddingTop: 6 }}>
                    <div
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: on ? C.accent : C.muted,
                        marginBottom: 10,
                        fontWeight: 500,
                        transition: 'color .4s',
                      }}
                    >
                      {s.tag}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        margin: '0 0 12px',
                        fontSize: 'clamp(26px, 3.4vw, 44px)',
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {s.verb}
                    </h3>
                    <p style={{ margin: 0, fontSize: 'clamp(15px,1.15vw,18px)', lineHeight: 1.55, color: C.muted, maxWidth: '38ch', fontWeight: 300 }}>
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div
                  className="kls-tl-meta"
                  style={{
                    flex: '0 0 auto',
                    alignSelf: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 16px',
                    borderRadius: 100,
                    background: on ? C.card : 'transparent',
                    border: `1px solid ${on ? 'rgba(75,123,245,0.4)' : C.line}`,
                    transition: 'background .4s, border-color .4s',
                  }}
                >
                  <span style={{ fontSize: 13, color: C.muted, textDecoration: 'line-through', textDecorationColor: 'rgba(240,237,232,0.3)' }}>
                    {s.from}
                  </span>
                  <span style={{ color: C.accent, fontSize: 14 }}>→</span>
                  <span style={{ fontSize: 13, color: on ? C.text : C.muted, fontWeight: 400 }}>{s.to}</span>
                </div>
              </div>

              {on && playing && (
                <div key={active} style={{ position: 'absolute', left: 14, right: 0, bottom: 0, height: 1, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      background: 'rgba(75,123,245,0.55)',
                      transformOrigin: 'left',
                      animation: `klsTimer ${DUR}ms linear forwards`,
                    }}
                  />
                </div>
              )}
            </button>
          )
        })}
      </div>
      </div>
    </section>
  )
}
