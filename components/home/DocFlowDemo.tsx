'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, RefreshCw } from 'lucide-react'
import { docflowDemo } from '@/lib/data/home'
import s from './home.module.css'

const LAST_STEP = docflowDemo.stages.length - 1

export default function DocFlowDemo() {
  const [step, setStep] = useState(0)
  const demoRef = useRef<HTMLDivElement>(null)
  const [title, text] = docflowDemo.stages[step]

  // Bouton "Découvrir son fonctionnement" rendu par DocFlowSection (Server Component)
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('[data-docflow-explain]')) return
      setStep(0)
      demoRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className={`${s.demo} ${s.anchor}`} id="demo-docflow" ref={demoRef}>
      <div className={s['demo-head']}>
        <span>
          <CheckCircle2 size={16} /> {docflowDemo.name}
        </span>
        <small>{docflowDemo.subtitle}</small>
      </div>
      <div className={s['demo-steps']}>
        {docflowDemo.steps.map((label, index) => (
          <button
            key={label}
            type="button"
            className={`${s.stepBtn} ${index === step ? s.active : ''}`}
            aria-pressed={index === step}
            onClick={() => setStep(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={s['demo-content']}>
        <span className={s.tag}>{docflowDemo.folder}</span>
        <h3 style={{ marginTop: 17 }}>{title}</h3>
        <p>{text}</p>
        <div className={s.progress}>
          <div style={{ width: `${(step + 1) * 25}%` }} />
        </div>
        <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <button
            type="button"
            className={`${s.btn} ${s['btn-primary']}`}
            onClick={() => setStep((current) => (current + 1) % docflowDemo.stages.length)}
          >
            {step === LAST_STEP ? (
              <span>
                {docflowDemo.restartLast} <RefreshCw size={15} />
              </span>
            ) : (
              docflowDemo.next
            )}
          </button>
          <button type="button" className={`${s.btn} ${s['btn-outline']}`} onClick={() => setStep(0)}>
            {docflowDemo.reset}
          </button>
        </div>
      </div>
    </div>
  )
}
