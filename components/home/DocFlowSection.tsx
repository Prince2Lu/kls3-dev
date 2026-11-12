import { Play } from 'lucide-react'
import { docflow } from '@/lib/data/home'
import DocFlowDemo from './DocFlowDemo'
import s from './home.module.css'

export default function DocFlowSection() {
  return (
    <section id="docflow" className={`${s.section} ${s.docflow}`}>
      <div className={`${s.wrap} ${s.docgrid}`}>
        <div>
          <span className={s.tag}>{docflow.tag}</span>
          <h2>
            {docflow.titleLine1}
            <br />
            {docflow.titleLine2Start}
            <span style={{ color: '#7035ed' }}>{docflow.titleLine2Accent}</span>
          </h2>
          <p>{docflow.text}</p>
          <div className={s.actions}>
            <a href="#demo-docflow" className={`${s.btn} ${s['btn-primary']}`}>
              {docflow.tryCta}
            </a>
            {/* Géré par DocFlowDemo (retour à l'étape 1 + défilement vers la démo) */}
            <button type="button" data-docflow-explain className={`${s.btn} ${s['btn-outline']}`}>
              <span>
                {docflow.explainCta} <Play size={15} />
              </span>
            </button>
          </div>
          <div className={s.notice}>{docflow.notice}</div>
        </div>
        <DocFlowDemo />
      </div>
    </section>
  )
}
