import type { ReportKpi, WeeklyActivityPoint } from '@/lib/types/demo'

export const reportingKpis: ReportKpi[] = [
  { label: 'Pièces collectées', value: 18 },
  { label: 'Onboardings terminés', value: 3 },
  { label: 'Événements traités', value: 7 },
  { label: 'Synchronisations effectuées', value: 24 },
]

export const weeklyActivity: WeeklyActivityPoint[] = [
  { day: 'Lun', value: 12 },
  { day: 'Mar', value: 18 },
  { day: 'Mer', value: 9 },
  { day: 'Jeu', value: 22 },
  { day: 'Ven', value: 15 },
]

export const manualTimeEstimate = 'plus de 3h de consolidation manuelle chaque semaine'
export const generatedTimeLabel = 'Rapport généré en 2 secondes'

export const reportSummaryBullets: string[] = [
  '18 pièces collectées cette semaine, 3 relances en attente.',
  '3 nouveaux dossiers intégrés selon le parcours standard.',
  '7 événements clients détectés et traités, aucun en attente.',
  '24 synchronisations effectuées entre les outils du cabinet, sans ressaisie manuelle.',
]

export const chartTitle = 'Activité de la semaine'
export const reportTitle = 'Rapport hebdomadaire'
export const reportWeekLabel = 'Semaine du 25 août 2026'
export const generateButtonLabel = 'Générer le rapport'
export const generatingButtonLabel = 'Compilation en cours...'
export const downloadButtonLabel = 'Télécharger le PDF'
export const downloadHint = 'Aperçu uniquement'
export const formerlyPrefix = 'Autrefois : '
export const GENERATION_DELAY_MS = 1200
