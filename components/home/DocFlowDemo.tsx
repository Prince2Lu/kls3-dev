'use client'

import { useEffect, useRef, useState } from 'react'
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
    <div className={`${s.card} ${s.demo} ${s.anchor}`} id="demo-docflow" ref={demoRef}>
      <div className={s['demo-head']}>
        <span>{docflowDemo.name}</span>
        <small>{docflowDemo.subtitle}</small>
      </div>
      <div className={s['demo-steps']}>
        {docflowDemo.steps.map((label, index) => (
          <button
            key={label}
            type="button"
            className={`${s.stepBtn} ${index === step ? s.active : index < step ? s.done : ''}`}
            aria-pressed={index === step}
            onClick={() => setStep(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={s['demo-content']}>
        <p className={s.folder}>{docflowDemo.folder}</p>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className={s.progress}>
          <div style={{ width: `${(step + 1) * 25}%` }} />
        </div>
        <div className={s['demo-actions']}>
          <button
            type="button"
            className={`${s.btn} ${s['btn-primary']}`}
            onClick={() => setStep((current) => (current + 1) % docflowDemo.stages.length)}
          >
            {step === LAST_STEP ? `${docflowDemo.restartLast} ↻` : docflowDemo.next}
          </button>
          <button type="button" className={`${s.btn} ${s['btn-outline']}`} onClick={() => setStep(0)}>
            {docflowDemo.reset}
          </button>
        </div>
      </div>
    </div>
  )
}
