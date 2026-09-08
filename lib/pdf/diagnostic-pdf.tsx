import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import type { AutomationPack } from '@/lib/data/automation-packs'
import { kls3CompanyInfo } from '@/lib/data/company-info'

/** Remplace les caractères non supportés par les polices de base du PDF (Helvetica). */
function sanitizeForPdf(text: string): string {
  return text
    .replace(/→/g, '->')
    .replace(/[\u202F\u00A0]/g, ' ')
}

type DiagnosticPdfProps = {
  nom: string
  cabinet: string
  email: string
  telephone: string
  score: number
  heuresMois: number
  coutAn: number
  parametres: {
    clients: number
    outils: number
    relanceHeures: number
    dossiersDivergents: number
    tempsStatutMinutes: number
    tauxHoraire: number
  }
  allPacks: AutomationPack[]
  selectedPackIds: string[]
  date: string
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottom: '1px solid #E5E5E5',
    paddingBottom: 16,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 40, height: 40 },
  logoText: { fontSize: 18, fontFamily: 'Helvetica-Bold', marginLeft: 8 },
  headerTitle: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: '#4B7BF5' },
  headerDate: { fontSize: 9, color: '#888780' },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginTop: 20,
    marginBottom: 10,
  },
  clientBox: {
    backgroundColor: '#F5F3EF',
    borderRadius: 6,
    padding: 12,
    marginBottom: 4,
  },
  coordGrid: { flexDirection: 'row', marginBottom: 10 },
  coordGridLast: { flexDirection: 'row' },
  coordCell: { width: '50%', paddingRight: 8 },
  coordLabel: { color: '#888780', fontSize: 8, marginBottom: 2 },
  label: { color: '#888780' },
  value: { fontFamily: 'Helvetica-Bold', color: '#111827' },
  scoreRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 },
  scoreValue: { fontSize: 32, fontFamily: 'Helvetica-Bold', color: '#4B7BF5', marginRight: 6 },
  scoreLabel: { fontSize: 10, color: '#888780' },
  scoreBarBg: {
    height: 6,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
    marginBottom: 14,
  },
  scoreBarFill: {
    height: 6,
    backgroundColor: '#4B7BF5',
    borderRadius: 3,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1px solid #E5E5E5',
    paddingVertical: 6,
  },
  packCard: {
    border: '1px solid #E5E5E5',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  packCardSelected: {
    border: '1px solid #4B7BF5',
    backgroundColor: '#EEF2FF',
  },
  packHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  packTitle: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  packBadge: {
    fontSize: 8,
    color: '#4B7BF5',
    fontFamily: 'Helvetica-Bold',
  },
  packDescription: { fontSize: 9, color: '#444444', lineHeight: 1.4 },
  footer: {
    marginTop: 24,
    paddingTop: 12,
    borderTop: '1px solid #E5E5E5',
    fontSize: 8,
    color: '#888780',
  },
})

export function DiagnosticPdf({
  nom,
  cabinet,
  email,
  telephone,
  score,
  heuresMois,
  coutAn,
  parametres,
  allPacks,
  selectedPackIds,
  date,
}: DiagnosticPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.logoRow}>
            <Image src={kls3CompanyInfo.logoUrl} style={styles.logo} />
            <Text style={styles.logoText}>
              <Text style={{ color: '#111827' }}>KLS</Text>
              <Text style={{ color: '#4B7BF5' }}>3</Text>
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.headerTitle}>Diagnostic de friction opérationnelle</Text>
            <Text style={styles.headerDate}>{date}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Vos coordonnées</Text>
        <View style={styles.clientBox}>
          <View style={styles.coordGrid}>
            <View style={styles.coordCell}>
              <Text style={styles.coordLabel}>Nom et prénom</Text>
              <Text style={styles.value}>{sanitizeForPdf(nom)}</Text>
            </View>
            <View style={styles.coordCell}>
              <Text style={styles.coordLabel}>Cabinet</Text>
              <Text style={styles.value}>{sanitizeForPdf(cabinet)}</Text>
            </View>
          </View>
          <View style={styles.coordGridLast}>
            <View style={styles.coordCell}>
              <Text style={styles.coordLabel}>Email</Text>
              <Text style={styles.value}>{sanitizeForPdf(email)}</Text>
            </View>
            <View style={styles.coordCell}>
              <Text style={styles.coordLabel}>Téléphone</Text>
              <Text style={styles.value}>{sanitizeForPdf(telephone)}</Text>
            </View>
          </View>
          <View style={styles.clientRow}>
            <Text style={styles.label}>Téléphone</Text>
            <Text style={styles.value}>{sanitizeForPdf(telephone)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Score de friction opérationnelle</Text>
        <View style={styles.scoreRow}>
          <Text style={styles.scoreValue}>{score}</Text>
          <Text style={styles.scoreLabel}>/100</Text>
        </View>
        <View style={styles.scoreBarBg}>
          <View style={[styles.scoreBarFill, { width: `${score}%` }]} />
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.label}>Temps mobilisé</Text>
          <Text style={styles.value}>{heuresMois} h / mois</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.label}>Capacité administrative mobilisée</Text>
          <Text style={styles.value}>
            {sanitizeForPdf(coutAn.toLocaleString('fr-FR'))} € / an
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Paramètres du diagnostic</Text>
        <View style={styles.metricRow}>
          <Text style={styles.label}>Nombre de dossiers/actes actifs</Text>
          <Text style={styles.value}>{parametres.clients}</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.label}>Outils / logiciels utilisés au quotidien</Text>
          <Text style={styles.value}>{parametres.outils}</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.label}>Heures / semaine — relances & ressaisie</Text>
          <Text style={styles.value}>{parametres.relanceHeures} h</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.label}>Dossiers avec infos divergentes / mois</Text>
          <Text style={styles.value}>{parametres.dossiersDivergents}</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.label}>Temps moyen pour retrouver le statut d&apos;un dossier</Text>
          <Text style={styles.value}>{parametres.tempsStatutMinutes} min</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.label}>Coût horaire chargé moyen</Text>
          <Text style={styles.value}>{parametres.tauxHoraire} €</Text>
        </View>

        <Text style={styles.sectionTitle}>Les Automation Packs KLS3</Text>
        {allPacks.map((pack) => {
          const isSelected = selectedPackIds.includes(pack.id)
          return (
            <View
              key={pack.id}
              style={isSelected ? [styles.packCard, styles.packCardSelected] : styles.packCard}
            >
              <View style={styles.packHeader}>
                <Text style={styles.packTitle}>
                  {pack.numero} — {sanitizeForPdf(pack.titre)}
                </Text>
                <Text style={styles.packBadge}>
                  {isSelected ? 'Sélectionné · ' : ''}Potentiel {pack.potentiel}
                </Text>
              </View>
              <Text style={styles.packDescription}>{pack.description}</Text>
            </View>
          )
        })}

        <Text style={{ fontSize: 8, fontStyle: 'italic', color: '#888780', marginTop: 8 }}>
          Estimation indicative de modélisation, à affiner lors d&apos;un diagnostic approfondi
          avec votre cabinet.
        </Text>

        <View style={styles.footer}>
          <Text>
            {kls3CompanyInfo.nom} — {kls3CompanyInfo.formeJuridique}
          </Text>
          <Text>
            {kls3CompanyInfo.adresse} · SIRET {kls3CompanyInfo.siret}
          </Text>
          <Text>
            {kls3CompanyInfo.site} · {kls3CompanyInfo.email}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
