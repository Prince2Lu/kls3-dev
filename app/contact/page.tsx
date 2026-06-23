import type { Metadata } from 'next'
import { Mail, MessageSquare, Calendar } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import ContactForm from '@/components/sections/ContactForm'
import GlassCard from '@/components/ui/GlassCard'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Parlons de votre projet. Gestion de projet, transformation digitale, solution SaaS — nous répondons sous 24h.',
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'contact@kls3-dev.com',
    description: 'Réponse sous 24h',
  },
  {
    icon: MessageSquare,
    title: 'LinkedIn',
    content: 'Envoyer un message',
    description: 'Pour une prise de contact rapide',
  },
  {
    icon: Calendar,
    title: 'Disponibilité',
    content: 'Prenons 30 minutes pour en parler',
    description: 'Sans engagement, premier échange offert',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24">
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <SectionLabel className="mb-4">Contact</SectionLabel>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Parlons de votre <span className="gradient-text">projet</span>.
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
            Remplissez ce formulaire et nous vous répondons sous 24h. Le premier échange est gratuit et sans engagement.
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info) => {
              const Icon = info.icon
              return (
                <GlassCard key={info.title} className="p-6 text-center">
                  <Icon className="w-8 h-8 text-brand-purple mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">{info.title}</h3>
                  {info.title === 'Email' ? (
                    <a
                      href="mailto:contact@kls3-dev.com"
                      className="text-brand-cyan hover:text-brand-cyan-light transition-colors mb-1 inline-block"
                    >
                      {info.content}
                    </a>
                  ) : info.title === 'LinkedIn' ? (
                    <a
                      href="https://www.linkedin.com/company/kls3/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-cyan hover:text-brand-cyan-light transition-colors mb-1 inline-block"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-foreground/90 mb-1">{info.content}</p>
                  )}
                  <p className="text-foreground/60 text-sm">{info.description}</p>
                </GlassCard>
              )
            })}
          </div>

          {/* Contact form */}
          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
