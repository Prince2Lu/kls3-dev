import type { Metadata } from 'next'
import DemoEtudeClient from './DemoEtudeClient'

export const metadata: Metadata = {
  title: { absolute: 'Démonstration privée | KLS3' },
  description: "Simulation KLS3 préparée pour l'étude PEFFERKORN, BAILLOT & THINES.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-image-preview': 'none',
      'max-snippet': 0,
      'max-video-preview': 0,
    },
  },
}

export default function DemoEtudePage() {
  return <DemoEtudeClient />
}
