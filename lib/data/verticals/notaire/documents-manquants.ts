import type {
  DemoDocumentItem,
  DossierStatus,
  ReminderStep,
  StaticDossierRow,
} from '@/lib/types/demo'

export const interactiveClientName = 'SCI Les Tilleuls'
export const interactiveClientContact = 'Maître A. Dubois, notaire en charge'
export const interactiveDeadlineLabel =
  'Pièces attendues avant signature - vente 12 rue des Vignes'

export const initialDocuments: DemoDocumentItem[] = [
  { id: 'identite-vendeur', label: "Pièce d'identité du vendeur", received: true },
  { id: 'identite-acquereur', label: "Pièce d'identité de l'acquéreur", received: false },
  { id: 'justificatif-domicile', label: 'Justificatif de domicile', received: false },
  { id: 'diag-dpe', label: 'Diagnostic de performance énergétique', received: false },
  { id: 'diag-amiante', label: 'Diagnostic amiante', received: true },
  { id: 'titre-propriete', label: 'Titre de propriété', received: false },
]

export const staticDossiers: StaticDossierRow[] = [
  { clientName: 'M. et Mme Bertrand', status: 'complet', itemsReceived: '6/6' },
  { clientName: 'SCI Du Parc', status: 'en_cours', itemsReceived: '4/6' },
  { clientName: 'Famille Lefort', status: 'en_attente', itemsReceived: '1/6' },
  { clientName: 'SCI Les Erables', status: 'complet', itemsReceived: '6/6' },
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
