import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos | KLS3',
  description: 'KLS3, partenaire d\'intelligence opérationnelle. Qui sommes-nous, notre équipe et nos valeurs.',
}

const sectionLabelStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 22,
  fontSize: 12,
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: '#4B7BF5',
  fontWeight: 500,
}

const cardStyle = {
  background: '#111111',
  border: '0.5px solid rgba(255,255,255,0.07)',
  borderRadius: 16,
  padding: '36px 32px',
}

export default function APropos() {
  return (
    <main
      style={{
        background: '#0D0D0D',
        color: '#F0EDE8',
        fontFamily: 'var(--font-body)',
        fontWeight: 300,
      }}
    >
      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(80px, 8vw, 120px) clamp(20px, 5vw, 80px) 64px',
        }}
      >
        <div style={sectionLabelStyle}>
          <span style={{ width: 28, height: 1, background: '#4B7BF5', display: 'inline-block' }} />
          À propos
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 62px)',
            lineHeight: 1.04,
            letterSpacing: '-0.02em',
            color: '#F0EDE8',
            maxWidth: '18ch',
            margin: '0 0 24px',
          }}
        >
          Une équipe.
          <br />
          Pas une agence.
        </h1>
        <p
          style={{
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            color: 'rgba(240,237,232,0.55)',
            lineHeight: 1.7,
            maxWidth: '58ch',
            margin: 0,
          }}
        >
          KLS3 est née d&apos;un constat simple : les organisations à forte valeur ajoutée méritent
          une approche opérationnelle sans les lourdeurs des grandes structures. Nous combinons
          compréhension métier, pilotage projet et capacité d&apos;exécution technique.
        </p>
      </section>

      <div
        style={{
          height: '0.5px',
          background: 'rgba(255,255,255,0.07)',
          margin: '0 clamp(20px, 5vw, 80px)',
        }}
      />

      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '64px clamp(20px, 5vw, 80px)',
        }}
      >
        <div style={{ ...sectionLabelStyle, marginBottom: 40 }}>
          <span style={{ width: 28, height: 1, background: '#4B7BF5', display: 'inline-block' }} />
          L&apos;équipe
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 16,
          }}
        >
          <div style={cardStyle}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#4B7BF5',
                marginBottom: 16,
                opacity: 0.8,
              }}
            >
              Co-fondateur · Directeur de missions
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 28,
                color: '#F0EDE8',
                margin: '0 0 16px',
                letterSpacing: '-0.01em',
              }}
            >
              Éric
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(240,237,232,0.55)', lineHeight: 1.7, margin: 0 }}>
              20+ ans d&apos;expérience en gestion de projet et transformation digitale. Missions en
              France, Allemagne, Luxembourg et Belgique pour des structures allant de la startup au
              grand groupe.
            </p>
          </div>
          <div style={cardStyle}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#4B7BF5',
                marginBottom: 16,
                opacity: 0.8,
              }}
            >
              Co-fondateur · Directeur commercial
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 28,
                color: '#F0EDE8',
                margin: '0 0 16px',
                letterSpacing: '-0.01em',
              }}
            >
              Lilian
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(240,237,232,0.55)', lineHeight: 1.7, margin: 0 }}>
              En charge du développement commercial et de la relation client. Interlocuteur
              privilégié pour les premiers échanges et la définition de vos besoins.
            </p>
          </div>
        </div>
        <p
          style={{
            fontSize: 14,
            color: 'rgba(240,237,232,0.35)',
            marginTop: 20,
            fontStyle: 'italic',
          }}
        >
          Selon les missions, nous mobilisons un réseau d&apos;experts spécialisés — chaque projet
          bénéficie des compétences exactement adaptées à ses enjeux.
        </p>
      </section>

      <div
        style={{
          height: '0.5px',
          background: 'rgba(255,255,255,0.07)',
          margin: '0 clamp(20px, 5vw, 80px)',
        }}
      />

      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '64px clamp(20px, 5vw, 80px)',
        }}
      >
        <div style={{ ...sectionLabelStyle, marginBottom: 40 }}>
          <span style={{ width: 28, height: 1, background: '#4B7BF5', display: 'inline-block' }} />
          Nos valeurs
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 16,
          }}
        >
          <div style={{ ...cardStyle, padding: '32px 28px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 18,
                color: '#F0EDE8',
                margin: '0 0 12px',
              }}
            >
              Clarté avant tout
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(240,237,232,0.5)', lineHeight: 1.65, margin: 0 }}>
              Nous disons ce que nous faisons, et nous faisons ce que nous disons. Pas de jargon
              inutile, pas de promesses sans fondement.
            </p>
          </div>
          <div style={{ ...cardStyle, padding: '32px 28px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 18,
                color: '#F0EDE8',
                margin: '0 0 12px',
              }}
            >
              Orientation résultats
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(240,237,232,0.5)', lineHeight: 1.65, margin: 0 }}>
              Chaque mission commence par la définition d&apos;objectifs mesurables. C&apos;est ce qui
              nous permet d&apos;évaluer ensemble si nous avons réussi.
            </p>
          </div>
          <div
            style={{
              background: '#4B7BF5',
              border: '0.5px solid #4B7BF5',
              borderRadius: 16,
              padding: '32px 28px',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 18,
                color: '#fff',
                margin: '0 0 12px',
              }}
            >
              Confidentialité absolue
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, margin: 0 }}>
              Nous intervenons dans des environnements où la confidentialité est critique. NDA
              systématique, données sécurisées, discrétion garantie.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          background: '#4B7BF5',
          padding: '64px clamp(20px, 5vw, 80px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 24,
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 42px)',
            color: '#fff',
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          Faisons connaissance.
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
          Premier échange gratuit et sans engagement.
        </p>
        <Link
          href="/contact"
          style={{
            background: '#fff',
            color: '#4B7BF5',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 14,
            padding: '14px 32px',
            borderRadius: 100,
            textDecoration: 'none',
            letterSpacing: '0.03em',
          }}
        >
          Demander une première analyse
        </Link>
      </section>
    </main>
  )
}
