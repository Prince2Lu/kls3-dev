import type { ConnectedTool, SourceEventField, ToolSyncStatus } from '@/lib/types/demo'

export const sourceEventTitle = 'Nouveau dossier client'
export const sourceEventSubtitle = 'Cabinet Lefèvre et associés'

export const sourceEventFields: SourceEventField[] = [
  { label: 'Nom du client', value: 'Julien Fontaine' },
  { label: 'SIRET', value: '812 345 678 00021' },
  { label: 'Email', value: 'j.fontaine@exemple.fr' },
  { label: 'Type de dossier', value: "Clôture d'exercice" },
]

export const connectedTools: ConnectedTool[] = [
  { id: 'facturation', name: 'Logiciel de facturation', icon: 'ti-receipt-2' },
  { id: 'stockage', name: 'Espace de stockage partagé', icon: 'ti-folder' },
  { id: 'gestion', name: 'Outil de gestion interne', icon: 'ti-clipboard-list' },
  { id: 'messagerie', name: 'Messagerie', icon: 'ti-mail' },
]

export const syncDelays: Record<string, number> = {
  facturation: 600,
  stockage: 1100,
  gestion: 1600,
  messagerie: 2000,
}

export function getInitialToolStatuses(): Record<string, ToolSyncStatus> {
  return Object.fromEntries(connectedTools.map((tool) => [tool.id, 'attente' as const]))
}