'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const FAQS = [
  {
    q: "Qu'est-ce qu'une friction opérationnelle ?",
    a: "Une friction opérationnelle est une tâche, un processus ou une dépendance qui ralentit l'organisation sans créer de valeur. Elle peut prendre la forme de reporting manuel, de données dispersées, de relances répétitives ou d'un manque de visibilité sur l'activité. Ces frictions sont souvent invisibles car elles font partie des habitudes quotidiennes des équipes.",
  },
  {
    q: 'Comment KLS3 identifie-t-il les frictions dans mon organisation ?',
    a: "Nous commençons par un échange de découverte sans engagement pour comprendre votre contexte. Nous analysons ensuite les flux réels de votre organisation — pas les processus théoriques — pour identifier précisément où l'énergie est gaspillée et pourquoi.",
  },
  {
    q: "Pour quels types d'entreprises intervenez-vous ?",
    a: "Cabinets d'expertise comptable multi-activités, études notariales, et plus largement toute structure réglementée organisée en pôles (comptabilité, social, juridique, patrimoine, immobilier...) qui jongle entre plusieurs logiciels métier sans passerelle native.",
  },
  {
    q: 'Combien de temps dure une intervention ?',
    a: 'Nos interventions durent en général de six semaines à six mois selon la complexité du sujet. Chaque mission produit des livrables concrets : processus simplifiés, automatisations opérationnelles, tableaux de bord de pilotage.',
  },
  {
    q: 'Quelle est la différence entre KLS3 et un cabinet de conseil classique ?',
    a: "KLS3 intervient directement, sans déléguer à des équipes junior. Nous n'avons pas de produit à placer ni de logiciel à vendre — nous travaillons uniquement sur vos opérations pour produire des résultats mesurables.",
  },
  {
    q: 'Faut-il changer nos outils existants ?',
    a: "Non. Nous construisons des solutions connectées à vos outils existants, sans rupture dans les habitudes de vos équipes. L'objectif n'est pas de remplacer votre système d'information, mais d'éliminer les frictions les plus coûteuses.",
  },
  {
    q: 'Comment savoir si mon organisation a des frictions opérationnelles ?',
    a: 'Si vos équipes passent du temps à ressaisir des données, à relancer manuellement des interlocuteurs, à chercher des informations dans plusieurs systèmes ou à produire des rapports à la main — votre organisation a des frictions opérationnelles.',
  },
  {
    q: "Quels résultats peut-on attendre d'une intervention KLS3 ?",
    a: "Réduction des tâches manuelles, meilleure visibilité sur l'activité, fluidité opérationnelle accrue et capacité à absorber la croissance sans multiplier les coûts de coordination.",
  },
  {
    q: 'Comment se déroule la première prise de contact ?',
    a: "La première étape est un échange de découverte sans engagement. Vous décrivez l'opération qui vous ralentit le plus, nous vous proposons un cadrage précis avec des objectifs mesurables et un périmètre défini.",
  },
  {
    q: 'KLS3 intervient-il à distance ou sur site ?',
    a: 'Les deux. Nous adaptons notre mode d\'intervention à votre contexte. Nous intervenons en France, au Luxembourg et dans les pays limitrophes.',
  },
] as const

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
          {FAQS.map((item, index) => {
            const isOpen = open === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <div
                key={item.q}
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
                  <span>{item.q}</span>
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
                        {item.a}
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
