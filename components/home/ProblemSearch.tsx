'use client'

import { useRef, useState, type FormEvent } from 'react'
import { problemSearch } from '@/lib/data/home'
import { classify } from '@/lib/home/classify'
import { openContactModal } from '@/lib/home/contact'
import s from './home.module.css'

type Result = { query: string; title: string; description: string }

export default function ProblemSearch() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const SubmitIcon = problemSearch.submitIcon

  const search = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    const [title, description] = classify(trimmed)
    setResult({ query: trimmed, title, description })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    search(query)
  }

  const handleChip = (chipQuery: string) => {
    setQuery(chipQuery)
    inputRef.current?.focus()
    search(chipQuery)
  }

  const handleTalk = () => {
    if (!result) return
    openContactModal({
      source: 'recherche',
      message: `Difficulté décrite : "${result.query}" — Piste identifiée : ${result.title}`,
    })
  }

  return (
    <section className={s['search-section']}>
      <div className={s.wrap}>
        <div className={s.searchbox}>
          <h2>{problemSearch.title}</h2>
          <p>{problemSearch.text}</p>
          <form className={s.searchrow} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              required
              aria-label={problemSearch.inputLabel}
              placeholder={problemSearch.placeholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit" className={`${s.btn} ${s['btn-primary']}`}>
              <span>
                <SubmitIcon size={16} /> {problemSearch.submit}
              </span>
            </button>
          </form>
          <div className={s.chips}>
            <span>{problemSearch.chipsLabel}</span>
            {problemSearch.chips.map(({ icon: Icon, label, query: chipQuery }) => (
              <button key={label} type="button" className={s.chip} onClick={() => handleChip(chipQuery)}>
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>
          <div aria-live="polite">
            {result && (
              <div className={s['search-result']}>
                <strong>{result.title}</strong>
                <p>{result.description}</p>
                <a href="#simulateur" className={`${s.btn} ${s['btn-primary']}`}>
                  {problemSearch.estimateCta}
                </a>{' '}
                <button type="button" className={`${s.btn} ${s['btn-outline']}`} onClick={handleTalk}>
                  {problemSearch.talkCta}
                </button>
                <div className={s.notice}>{problemSearch.notice}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
