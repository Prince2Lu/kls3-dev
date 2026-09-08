import type { ReportKpi, WeeklyActivityPoint } from '@/lib/types/demo'

export const reportingKpis: ReportKpi[] = [
  { label: 'Actes en cours', value: 14 },
  { label: 'Dossiers immobiliers', value: 6 },
  { label: 'Dossiers famille', value: 4 },
  { label: 'Formalités ouvertes', value: 9 },
]

export const weeklyActivity: WeeklyActivityPoint[] = [
  { day: 'Lun', value: 11 },
  { day: 'Mar', value: 16 },
  { day: 'Mer', value: 8 },
  { day: 'Jeu', value: 19 },
  { day: 'Ven', value: 13 },
]

export const manualTimeEstimate = 'plus de 3h de consolidation manuelle chaque semaine'
export const generatedTimeLabel = 'Rapport généré en 2 secondes'

export const reportSummaryBullets: string[] = [
  '14 actes en cours tous services confondus, 9 formalités encore ouvertes.',
  '6 dossiers immobiliers et 4 dossiers famille actifs cette semaine.',
  '3 signatures traitées, dont la vente SCI Les Tilleuls (285 000 €).',
  'Synchronisations effectuées entre logiciel métier, GED, email et suivi des délais.',
]

export const chartTitle = 'Activité de la semaine'
export const reportTitle = 'Rapport transversal'
export const reportWeekLabel = 'Semaine du 1 septembre 2026'
export const generateButtonLabel = 'Générer le rapport'
export const generatingButtonLabel = 'Compilation en cours...'
export const downloadButtonLabel = 'Télécharger le PDF'
export const downloadHint = 'Aperçu uniquement'
export const formerlyPrefix = 'Autrefois : '
export const GENERATION_DELAY_MS = 1200
