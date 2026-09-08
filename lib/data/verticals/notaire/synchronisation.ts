import type { ConnectedTool, SourceEventField, ToolSyncStatus } from '@/lib/types/demo'

export const sourceEventTitle = 'Acte signé'
export const sourceEventSubtitle = 'Étude notariale Dubois & Associés'

export const sourceEventFields: SourceEventField[] = [
  { label: 'Client', value: 'SCI Les Tilleuls' },
  { label: 'Bien', value: '12 rue des Vignes, 57000 Metz' },
  { label: "Type d'acte", value: 'Vente immobilière' },
  { label: 'Montant', value: '285 000 €' },
  { label: 'Notaire', value: 'Maître A. Dubois' },
]

export const connectedTools: ConnectedTool[] = [
  { id: 'metier', name: 'Logiciel métier notarial', icon: 'ti-clipboard-list' },
  { id: 'ged', name: 'GED (Nextcloud)', icon: 'ti-folder' },
  { id: 'email', name: 'Email équipe', icon: 'ti-mail' },
  { id: 'delais', name: 'Suivi des délais', icon: 'ti-receipt-2' },
]

/** Enchaînement : acte signé → orchestration métier → 3 destinations. */
export const syncDelays: Record<string, number> = {
  metier: 500,
  ged: 1100,
  email: 1600,
  delais: 2000,
}

export function getInitialToolStatuses(): Record<string, ToolSyncStatus> {
  return Object.fromEntries(connectedTools.map((tool) => [tool.id, 'attente' as const]))
}
