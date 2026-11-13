import { docflow } from '@/lib/data/home'
import DocFlowDemo from './DocFlowDemo'
import SectionLabel from './SectionLabel'
import s from './home.module.css'

export default function DocFlowSection() {
  return (
    <section id="docflow" className={s.section}>
      <div className={`${s.wrap} ${s.docgrid}`}>
        <div>
          <SectionLabel>{docflow.tag}</SectionLabel>
          <h2>
            {docflow.titleLine1}
            <br />
            {docflow.titleLine2Start}
            <span className={s.accent}>{docflow.titleLine2Accent}</span>
          </h2>
          <p>{docflow.text}</p>
          <div className={s.actions}>
            <a href="#demo-docflow" className={`${s.btn} ${s['btn-primary']}`}>
              {docflow.tryCta}
            </a>
            {/* Géré par DocFlowDemo (retour à l'étape 1 + défilement vers la démo) */}
            <button type="button" data-docflow-explain className={`${s.btn} ${s['btn-outline']}`}>
              {docflow.explainCta} ▷
            </button>
          </div>
          <div className={s.notice}>{docflow.notice}</div>
        </div>
        <DocFlowDemo />
      </div>
    </section>
  )
}
