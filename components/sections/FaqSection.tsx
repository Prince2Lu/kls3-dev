'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { homepageFaqs } from '@/lib/data/faq'

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpen((prev) => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="scroll-mt-20" style={{ width: '100%', backgroundColor: '#0D0D0D' }}>
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '80px clamp(20px, 5vw, 80px)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#4B7BF5',
            fontWeight: 500,
            fontFamily: 'var(--font-body)',
          }}
        >
          <span style={{ width: 28, height: 1, background: '#4B7BF5', display: 'inline-block' }} />
          Questions fréquentes
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 42px)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: '#F0EDE8',
            margin: '0 0 48px',
          }}
        >
          Tout ce qu&apos;il faut savoir avant de commencer.
        </h2>

        <div>
          {homepageFaqs.map((item, index) => {
            const isOpen = open === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <div
                key={item.question}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    padding: '24px 0',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: '#F0EDE8',
                    fontFamily: 'var(--font-body)',
                    fontSize: 17,
                    fontWeight: 400,
                    lineHeight: 1.4,
                  }}
                >
                  <span>{item.question}</span>
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      color: '#4B7BF5',
                      fontSize: 22,
                      lineHeight: 1,
                      width: 24,
                      textAlign: 'center',
                    }}
                  >
                    {isOpen ? '×' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        style={{
                          margin: 0,
                          paddingBottom: 24,
                          fontFamily: 'var(--font-body)',
                          fontSize: 15,
                          lineHeight: 1.7,
                          color: 'rgba(240,237,232,0.65)',
                        }}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
