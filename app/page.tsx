import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import ProblemSearch from '@/components/home/ProblemSearch'
import Virage from '@/components/home/Virage'
import Solutions from '@/components/home/Solutions'
import Band from '@/components/home/Band'
import DocFlowSection from '@/components/home/DocFlowSection'
import Realisations from '@/components/home/Realisations'
import Methode from '@/components/home/Methode'
import Simulateur from '@/components/home/Simulateur'
import Financements from '@/components/home/Financements'
import Pourquoi from '@/components/home/Pourquoi'
import ContactSection from '@/components/home/ContactSection'
import s from '@/components/home/home.module.css'
import { homeMeta, manifestes } from '@/lib/data/home'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageMetadata(homeMeta.title, homeMeta.description, { path: '/' }),
  title: { absolute: homeMeta.title },
}

export default function Home() {
  return (
    <div className={s.root}>
      <div>
        <Hero />
        <ProblemSearch />
        <Virage />
        <Solutions />
        <Band {...manifestes.enjeux} />
        <DocFlowSection />
        <Realisations />
        <Methode />
        <Simulateur />
        <Band {...manifestes.rythme} />
        <Financements />
        <Pourquoi />
        <ContactSection />
      </div>
    </div>
  )
}
