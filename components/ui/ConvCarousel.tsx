'use client'
import { useEffect, useState } from 'react'

const conversations = [
  {
    role: "Cabinet d'avocats",
    color: "cyan",
    user: "Pouvez-vous analyser ce contrat NDA et identifier les clauses à risque ?",
    ai: "J'ai identifié 3 clauses sensibles. La clause 4.2 sur la durée de confidentialité est trop large et expose votre client à des risques significatifs.",
    time: "Analyse terminée · 2.3s"
  },
  {
    role: "Expert-comptable",
    color: "green",
    user: "Génère le rapport mensuel pour mon client Dupont & Associés à partir de leurs données de mai.",
    ai: "Rapport généré. CA mai : 142 300 € (+8% vs avril). Charges : 89 400 €. Résultat net : 52 900 €. PDF disponible pour envoi client.",
    time: "Rapport généré · 4.1s"
  },
  {
    role: "Corporate services",
    color: "purple",
    user: "Quels documents manquent encore pour finaliser l'onboarding de la société Meridian Ltd ?",
    ai: "Il manque 2 documents : la copie certifiée des statuts mis à jour et le justificatif de domicile du bénéficiaire effectif. Rappel envoyé automatiquement.",
    time: "Vérification terminée · 1.8s"
  },
  {
    role: "RH & recrutement",
    color: "amber",
    user: "Résume les 12 candidatures reçues pour le poste de juriste senior et classe-les par pertinence.",
    ai: "3 profils hautement pertinents identifiés. Marie D. (8 ans droit des affaires) et Thomas R. (ex-cabinet Magic Circle) sont à prioriser pour entretien.",
    time: "Analyse terminée · 3.6s"
  }
]

const colors: Record<string, { accent: string, userBg: string, userText: string, dot: string }> = {
  cyan:   { accent: '#0ea5e9', userBg: 'rgba(14,165,233,0.12)',  userText: '#38bdf8', dot: '#0ea5e9' },
  green:  { accent: '#10b981', userBg: 'rgba(16,185,129,0.12)',  userText: '#34d399', dot: '#10b981' },
  purple: { accent: '#7c3aed', userBg: 'rgba(124,58,237,0.12)', userText: '#a78bfa', dot: '#7c3aed' },
  amber:  { accent: '#f59e0b', userBg: 'rgba(245,158,11,0.12)', userText: '#fcd34d', dot: '#f59e0b' },
}

export default function ConvCarousel() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % conversations.length)
        setAnimating(false)
      }, 300)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const conv = conversations[current]
  const c = colors[conv.color]

  return (
    <div className="w-full max-w-md" style={{
      background: 'rgba(13, 11, 30, 0.95)',
      border: `0.5px solid ${c.accent}55`,
      borderRadius: '14px',
      padding: '20px',
      backdropFilter: 'blur(12px)',
    }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent}99)` }}>
          K
        </div>
        <div>
          <div className="text-xs font-medium text-white">Agent IA KLS<span style={{ color: '#4B7BF5' }}>3</span></div>
          <div
            className="text-xs transition-all duration-300"
            style={{
              color: c.userText,
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(4px)' : 'translateY(0)',
              transition: 'opacity 0.3s, transform 0.3s'
            }}
          >
            {conv.role}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs" style={{ color: '#34d399' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse inline-block" />
          En ligne
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.3s, transform 0.3s'
        }}
      >
        {/* User message */}
        <div className="rounded-lg px-3 py-2 text-xs mb-2 leading-relaxed" style={{ background: c.userBg, color: c.userText }}>
          {conv.user}
        </div>

        {/* AI response */}
        <div className="rounded-lg px-3 py-2 text-xs mb-3 leading-relaxed" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)' }}>
          {conv.ai}
        </div>

        {/* Status */}
        <div className="flex items-center gap-1.5 text-xs" style={{ color: '#34d399' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          {conv.time}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {conversations.map((_, i) => (
          <button
            key={i}
            onClick={() => { setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false) }, 300) }}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i === current ? c.accent : 'rgba(255,255,255,0.2)' }}
            aria-label={`Conversation ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
