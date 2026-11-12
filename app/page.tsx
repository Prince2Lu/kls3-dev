import type { Metadata } from 'next'
import HomeHeader from '@/components/home/HomeHeader'
import Hero from '@/components/home/Hero'
import ProblemSearch from '@/components/home/ProblemSearch'
import Solutions from '@/components/home/Solutions'
import DocFlowSection from '@/components/home/DocFlowSection'
import Realisations from '@/components/home/Realisations'
import Methode from '@/components/home/Methode'
import Simulateur from '@/components/home/Simulateur'
import Financements from '@/components/home/Financements'
import Pourquoi from '@/components/home/Pourquoi'
import ContactSection from '@/components/home/ContactSection'
import HomeFooter from '@/components/home/HomeFooter'
import ContactModal from '@/components/home/ContactModal'
import s from '@/components/home/home.module.css'
import { homeMeta } from '@/lib/data/home'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageMetadata(homeMeta.title, homeMeta.description, { path: '/' }),
  title: { absolute: homeMeta.title },
}

export default function Home() {
  return (
    <div className={s.root}>
      <HomeHeader />
      <div>
        <Hero />
        <ProblemSearch />
        <Solutions />
        <DocFlowSection />
        <Realisations />
        <Methode />
        <Simulateur />
        <Financements />
        <Pourquoi />
        <ContactSection />
      </div>
      <HomeFooter />
      <ContactModal />
    </div>
  )
}
