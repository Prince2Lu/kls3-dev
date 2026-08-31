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

export interface ConnectedTool {
  id: string
  name: string
  icon: string
}

export interface SourceEventField {
  label: string
  value: string
}

export type ToolSyncStatus = 'attente' | 'en_cours' | 'synchronise'

export interface OnboardingStage {
  id: string
  label: string
  actionLabel: string
  actionDescription: string
  doneLabel: string
}

export type OnboardingActionState = 'idle' | 'en_cours' | 'fait'

export interface OtherOnboardingRow {
  clientName: string
  currentStageLabel: string
  stageIndex: number
}

export type EventStatus = 'a_qualifier' | 'en_cours' | 'resolu'

export interface ClientEvent {
  id: string
  clientName: string
  eventType: string
  status: EventStatus
}

export interface EventTypePoolEntry {
  clientName: string
  eventType: string
}

export interface EventTypeDetail {
  detectedInfo: string
  qualificationNote: string
  resolutionNote: string
}

export interface EventColumnConfig {
  status: EventStatus
  label: string
}
