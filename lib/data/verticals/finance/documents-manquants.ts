import type {
  DemoDocumentItem,
  DossierStatus,
  ReminderStep,
  StaticDossierRow,
} from '@/lib/types/demo'

export const interactiveClientName = 'SAS Horizon Digital'
export const interactiveClientContact = 'Claire Moreau, dirigeante'
export const interactiveDeadlineLabel = 'Pièces attendues avant clôture — 30 septembre'

export const initialDocuments: DemoDocumentItem[] = [
  { id: 'kbis', label: 'Kbis de moins de 3 mois', received: false },
  { id: 'statuts', label: 'Statuts consolidés', received: false },
  { id: 'rib', label: 'RIB de la société', received: true },
  { id: 'identite', label: "Pièce d'identité du dirigeant", received: false },
  { id: 'liasse', label: 'Liasse fiscale N-1', received: false },
  { id: 'pv', label: "Procès-verbal d'assemblée", received: false },
]

export const staticDossiers: StaticDossierRow[] = [
  { clientName: 'Dupont Holding', status: 'complet', itemsReceived: '6/6' },
  { clientName: 'Meridian SAS', status: 'en_cours', itemsReceived: '4/6' },
  { clientName: 'Atelier North', status: 'en_attente', itemsReceived: '1/6' },
  { clientName: 'Groupe Alizé', status: 'complet', itemsReceived: '6/6' },
]

export const VERIFICATION_DELAY_MS = 700

export const reminderSteps: ReminderStep[] = [
  { id: 'j3', delayLabel: 'J+3', channel: 'Email', title: 'Première relance' },
  { id: 'j7', delayLabel: 'J+7', channel: 'Email', title: 'Deuxième relance' },
  { id: 'j14', delayLabel: 'J+14', channel: 'Email', title: 'Relance prioritaire' },
]

export function getReceivedCount(items: DemoDocumentItem[]): number {
  return items.filter((item) => item.received).length
}

export function getDossierStatus(items: DemoDocumentItem[]): DossierStatus {
  const received = getReceivedCount(items)
  if (received === 0) return 'en_attente'
  if (received === items.length) return 'complet'
  return 'en_cours'
}

export function getLiveDossierRow(items: DemoDocumentItem[]): StaticDossierRow {
  return {
    clientName: interactiveClientName,
    status: getDossierStatus(items),
    itemsReceived: `${getReceivedCount(items)}/${items.length}`,
  }
}
