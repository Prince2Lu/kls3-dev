import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { getVerticalConfig } from '@/lib/data/verticals'
import { getReportingPack } from '@/lib/data/verticals/packs'

/** Remplace les caractères non supportés par les polices de base du PDF (Helvetica). */
function sanitizeForPdf(text: string): string {
  return text
    .replace(/→/g, '->')
    .replace(/[\u202F\u00A0]/g, ' ')
    .replace(/[—–]/g, '-')
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingHorizontal: 44,
    paddingBottom: 56,
    fontSize: 11,
    fontFamily: 'Helvetica',
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  brand: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#4B7BF5',
  },
  title: {
    fontSize: 13,
    fontFamily: 'Helvetica',
    color: '#111827',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 10,
    marginBottom: 6,
  },
  headerRule: {
    marginTop: 14,
    marginBottom: 18,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#4B7BF5',
    marginBottom: 10,
    marginTop: 16,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  kpiCell: {
    width: '50%',
    paddingRight: 16,
    marginBottom: 12,
  },
  kpiValue: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  kpiLabel: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 2,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bullet: {
    width: 12,
    fontSize: 11,
    color: '#111827',
  },
  listText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.4,
    color: '#111827',
  },
  footer: {
    position: 'absolute',
    bottom: 28,
    left: 44,
    right: 44,
    borderTop: '1px solid #E5E7EB',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 8,
    color: '#9CA3AF',
    marginBottom: 2,
  },
})

interface WeeklyReportDocumentProps {
  verticalId?: string
}

export function WeeklyReportDocument({ verticalId = 'finance' }: WeeklyReportDocumentProps) {
  const config = getVerticalConfig(verticalId)
  const reporting = getReportingPack(verticalId)
  const companyName = sanitizeForPdf(config?.scenarioCompanyName ?? 'Demonstration KLS3')
  const weekLabel = sanitizeForPdf(reporting.reportWeekLabel)
  const subtitle = `${companyName} - ${weekLabel}`

  return (
    <Document
      title="Rapport hebdomadaire KLS3"
      author="KLS3"
      subject="Rapport hebdomadaire de demonstration"
      creator="KLS3"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.brand}>KLS3</Text>
        <Text style={styles.title}>{sanitizeForPdf(reporting.reportTitle)}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.headerRule} />

        <Text style={styles.sectionTitle}>Indicateurs cles</Text>
        <View style={styles.kpiGrid}>
          {reporting.reportingKpis.map((kpi) => (
            <View key={kpi.label} style={styles.kpiCell}>
              <Text style={styles.kpiValue}>{sanitizeForPdf(String(kpi.value))}</Text>
              <Text style={styles.kpiLabel}>{sanitizeForPdf(kpi.label)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Activite de la semaine</Text>
        {reporting.weeklyActivity.map((point) => (
          <View key={point.day} style={styles.listItem}>
            <Text style={styles.bullet}>-</Text>
            <Text style={styles.listText}>
              {sanitizeForPdf(`${point.day} : ${point.value}`)}
            </Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Synthese</Text>
        {reporting.reportSummaryBullets.map((bullet) => (
          <View key={bullet} style={styles.listItem}>
            <Text style={styles.bullet}>-</Text>
            <Text style={styles.listText}>{sanitizeForPdf(bullet)}</Text>
          </View>
        ))}

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            {sanitizeForPdf(
              'Document généré automatiquement à titre de démonstration - données fictives.',
            )}
          </Text>
          <Text style={styles.footerText}>KLS3 · kls3-dev.com</Text>
        </View>
      </Page>
    </Document>
  )
}
