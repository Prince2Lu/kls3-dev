export type PackId =
  | 'documents-manquants'
  | 'onboarding'
  | 'evenements-clients'
  | 'synchronisation'
  | 'reporting'
  | 'affectation-pilotage'

export type PackStatus = 'disponible' | 'a_venir'

export interface PackModuleConfig {
  id: PackId
  label: string
  description: string
  status: PackStatus
  route: string
}

export interface CompositeSubScore {
  label: string
  value: number
}

export interface VerticalConfig {
  id: string
  label: string
  scenarioCompanyName: string
  compositeScoreLabel: string
  compositeScoreValue: number
  subScores: CompositeSubScore[]
  counters: { label: string; value: string | number }[]
  modules: PackModuleConfig[]
}

export interface DemoDocumentItem {
  id: string
  label: string
  received: boolean
}

export type DossierStatus = 'en_attente' | 'en_cours' | 'complet'

export interface StaticDossierRow {
  clientName: string
  status: DossierStatus
  itemsReceived: string
}

export interface ReminderStep {
  id: string
  delayLabel: string
  channel: string
  title: string
}
