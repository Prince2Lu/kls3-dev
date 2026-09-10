import type { Metadata } from 'next'
import Link from 'next/link'
import HeroOperational from '@/components/sections/HeroOperational'
import FrictionsScanner from '@/components/sections/FrictionsScanner'
import KLS3MethodTimeline from '@/components/sections/KLS3MethodTimeline'
import ResultsSection from '@/components/sections/ResultsSection'
import SystemsSection from '@/components/sections/SystemsSection'
import TeamSection from '@/components/sections/TeamSection'
import BlogPreview from '@/components/sections/BlogPreview'
import FinalCTA from '@/components/sections/FinalCTA'
import FaqSection from '@/components/sections/FaqSection'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo'

const title = 'KLS3 — Orchestration opérationnelle pour professions réglementées'
const description =
  'KLS3 connecte les outils métier de vos pôles pour que les événements clients se propagent automatiquement, sans ressaisie. Grand-Est & Luxembourg.'

export const metadata: Metadata = {
  ...pageMetadata(title, description, { path: '/' }),
  title: { absolute: title },
}

export default function Home() {
  return (
    <>
      <div className="flex md:hidden justify-center pt-20 pb-4 px-4">
        <div className="flex flex-col items-center gap-1">
          <Link
            href="/contact"
            className="btn-beam font-display transition-colors duration-200 hover:!text-[#4B7BF5]"
            style={{
              display: 'inline-block',
              padding: '10px 22px',
              border: '1px solid rgba(240,237,232,0.35)',
              borderRadius: '100px',
              color: '#F0EDE8',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
              background: 'transparent',
              position: 'relative',
              isolation: 'isolate',
            }}
          >
            Analyser mes opérations →
          </Link>
          <span
            style={{
              fontSize: '10px',
              color: 'rgba(240,237,232,0.35)',
              letterSpacing: '0.04em',
            }}
          >
            Sans engagement · Réponse sous 48h
          </span>
        </div>
      </div>
      <HeroOperational />
      <FrictionsScanner loadFonts={false} />
      <KLS3MethodTimeline />
      <ResultsSection />
      <SystemsSection />
      <TeamSection />
      <BlogPreview />
      <FinalCTA />
      <FaqSection />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: "Qu'est-ce qu'une friction opérationnelle ?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Une friction opérationnelle est une tâche, un processus ou une dépendance qui ralentit l'organisation sans créer de valeur. Elle peut prendre la forme de reporting manuel, de données dispersées, de relances répétitives ou d'un manque de visibilité sur l'activité. Ces frictions sont souvent invisibles car elles font partie des habitudes quotidiennes des équipes.",
              },
            },
            {
              '@type': 'Question',
              name: 'Comment KLS3 identifie-t-il les frictions dans mon organisation ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Nous commençons par un échange de découverte sans engagement pour comprendre votre contexte. Nous analysons ensuite les flux réels de votre organisation pour identifier précisément où l'énergie est gaspillée et pourquoi.",
              },
            },
            {
              '@type': 'Question',
              name: "Pour quels types d'entreprises intervenez-vous ?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Cabinets d'expertise comptable multi-activités, études notariales, et plus largement toute structure réglementée organisée en pôles (comptabilité, social, juridique, patrimoine, immobilier...) qui jongle entre plusieurs logiciels métier sans passerelle native.",
              },
            },
            {
              '@type': 'Question',
              name: 'Combien de temps dure une intervention ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nos interventions durent en général de six semaines à six mois selon la complexité du sujet. Chaque mission produit des livrables concrets : processus simplifiés, automatisations opérationnelles, tableaux de bord de pilotage.',
              },
            },
            {
              '@type': 'Question',
              name: 'Quelle est la différence entre KLS3 et un cabinet de conseil classique ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "KLS3 intervient directement, sans déléguer à des équipes junior. Nous n'avons pas de produit à placer ni de logiciel à vendre — nous travaillons uniquement sur vos opérations pour produire des résultats mesurables.",
              },
            },
            {
              '@type': 'Question',
              name: 'Faut-il changer nos outils existants ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Non. Nous construisons des solutions connectées à vos outils existants, sans rupture dans les habitudes de vos équipes.',
              },
            },
            {
              '@type': 'Question',
              name: 'Comment savoir si mon organisation a des frictions opérationnelles ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Si vos équipes passent du temps à ressaisir des données, à relancer manuellement des interlocuteurs, à chercher des informations dans plusieurs systèmes ou à produire des rapports à la main — votre organisation a des frictions opérationnelles.',
              },
            },
            {
              '@type': 'Question',
              name: "Quels résultats peut-on attendre d'une intervention KLS3 ?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Réduction des tâches manuelles, meilleure visibilité sur l'activité, fluidité opérationnelle accrue et capacité à absorber la croissance sans multiplier les coûts de coordination.",
              },
            },
            {
              '@type': 'Question',
              name: 'Comment se déroule la première prise de contact ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "La première étape est un échange de découverte sans engagement. Vous décrivez l'opération qui vous ralentit le plus, nous vous proposons un cadrage précis avec des objectifs mesurables et un périmètre défini.",
              },
            },
            {
              '@type': 'Question',
              name: 'KLS3 intervient-il à distance ou sur site ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Les deux. Nous adaptons notre mode d\'intervention à votre contexte. Nous intervenons en France, au Luxembourg et dans les pays limitrophes.',
              },
            },
          ],
        }}
      />
    </>
  )
}
