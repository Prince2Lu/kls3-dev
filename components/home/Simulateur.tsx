'use client'

import { useState } from 'react'
import { simulateur } from '@/lib/data/home'
import { formatNumber, openContactModal } from '@/lib/home/contact'
import SectionLabel from './SectionLabel'
import s from './home.module.css'

const euro = (value: number) => `${formatNumber(value)} €`

export default function Simulateur() {
  const [domain, setDomain] = useState(simulateur.domains[0].value)
  const [hours, setHours] = useState(15)
  const [hourly, setHourly] = useState(50)
  const [extraInput, setExtraInput] = useState('0')
  const [advancedOpen, setAdvancedOpen] = useState(false)

  const selectedDomain = simulateur.domains.find((item) => item.value === domain) ?? simulateur.domains[0]
  const extra = Math.max(0, Number(extraInput) || 0)
  const base = hours * hourly * 52
  const total = base + extra

  const handleCta = () => {
    openContactModal({
      source: 'simulateur',
      message: `Domaine : ${selectedDomain.label} · ${hours} h/semaine · ${hourly} €/h · charge estimée ${formatNumber(total)} €/an`,
    })
  }

  return (
    <section id="simulateur" className={s.section}>
      <div className={s.wrap}>
        <SectionLabel>{simulateur.tag}</SectionLabel>
        <h2 style={{ marginTop: 16 }}>
          {simulateur.titleLine1}
          <br />
          {simulateur.titleLine2}
        </h2>
        <p className={s.lead}>{simulateur.lead}</p>
        <div className={s.simulator}>
          <div className={`${s.card} ${s['sim-controls']}`}>
            <label htmlFor="domain">{simulateur.domainLabel}</label>
            <select id="domain" value={domain} onChange={(event) => setDomain(event.target.value)}>
              {simulateur.domains.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <p className={s['sim-example']}>{selectedDomain.example}</p>
            <div className={s.sliderlabel}>
              <label htmlFor="hours">{simulateur.hoursLabel}</label>
              <strong>{hours} h</strong>
            </div>
            <input
              id="hours"
              type="range"
              min={1}
              max={80}
              value={hours}
              onChange={(event) => setHours(Number(event.target.value))}
            />
            <div className={s.sliderlabel}>
              <label htmlFor="hourly">{simulateur.hourlyLabel}</label>
              <strong>{hourly} €</strong>
            </div>
            <input
              id="hourly"
              type="range"
              min={15}
              max={120}
              step={5}
              value={hourly}
              onChange={(event) => setHourly(Number(event.target.value))}
            />
            <button
              className={`${s.btn} ${s['btn-outline']}`}
              type="button"
              aria-expanded={advancedOpen}
              aria-controls="sim-advanced"
              onClick={() => setAdvancedOpen((value) => !value)}
            >
              {simulateur.advancedToggle}
            </button>
            {advancedOpen && (
              <div id="sim-advanced" className={s['sim-advanced']}>
                <label htmlFor="errors">{simulateur.extraLabel}</label>
                <input
                  type="number"
                  id="errors"
                  min={0}
                  value={extraInput}
                  onChange={(event) => setExtraInput(event.target.value)}
                />
                <p>{simulateur.extraHint}</p>
              </div>
            )}
          </div>
          <div className={`${s.band} ${s.estimate}`}>
            <p className={s.kicker}>{simulateur.totalLabel}</p>
            <p className={s.total}>{euro(total)}</p>
            <p className={s.hours}>
              {formatNumber(hours * 52)}
              {simulateur.annualHoursSuffix}
            </p>
            <div className={s.breakdowns}>
              <div className={s.breakdown}>
                <span>{simulateur.baseLabel}</span>
                <strong>{euro(base)}</strong>
              </div>
              <div className={s.breakdown}>
                <span>{simulateur.extraBreakdownLabel}</span>
                <strong>{euro(extra)}</strong>
              </div>
            </div>
            <p className={s.totalnote}>{simulateur.totalNote}</p>
            <button type="button" className={`${s.btn} ${s['btn-primary']}`} onClick={handleCta}>
              {simulateur.cta}
            </button>
          </div>
        </div>
        <p className={s['sim-disclaimer']}>ⓘ {simulateur.disclaimer}</p>
      </div>
    </section>
  )
}
