import type {
  ClientEvent,
  EventColumnConfig,
  EventStatus,
  EventTypePoolEntry,
} from '@/lib/types/demo'

export const initialEvents: ClientEvent[] = [
  { id: 'evt-1', clientName: 'Marc Dubreuil', eventType: "Changement d'actionnaire", status: 'a_qualifier' },
  { id: 'evt-2', clientName: 'Sophie Alaoui', eventType: 'Document expiré', status: 'a_qualifier' },
  { id: 'evt-3', clientName: 'Nadia Benali', eventType: 'Changement de dirigeant', status: 'en_cours' },
  { id: 'evt-4', clientName: 'Julien Fontaine', eventType: 'Modification des statuts', status: 'en_cours' },
  { id: 'evt-5', clientName: 'Camille Rousseau', eventType: 'Changement de siège social', status: 'resolu' },
]

export const eventPool: EventTypePoolEntry[] = [
  { clientName: 'Thomas Weber', eventType: "Changement d'actionnaire" },
  { clientName: 'Élodie Marchand', eventType: 'Document expiré' },
  { clientName: 'Youssef Idrissi', eventType: 'Opération inhabituelle' },
  { clientName: 'Claire Vasseur', eventType: 'Changement de dirigeant' },
  { clientName: 'Marc Dubreuil', eventType: 'Modification des statuts' },
]

export const columnConfig: EventColumnConfig[] = [
  { status: 'a_qualifier', label: 'À qualifier' },
  { status: 'en_cours', label: 'Mise à jour en cours' },
  { status: 'resolu', label: 'Résolu' },
]

export const eventTypeIcons: Record<string, string> = {
  "Changement d'actionnaire": 'ti-users',
  'Document expiré': 'ti-file-x',
  'Changement de dirigeant': 'ti-user-star',
  'Modification des statuts': 'ti-file-description',
  'Changement de siège social': 'ti-building',
  'Opération inhabituelle': 'ti-alert-triangle',
}

export const eventActionLabels: Partial<Record<EventStatus, string>> = {
  a_qualifier: 'Qualifier',
  en_cours: 'Marquer comme résolu',
}

export function nextEventStatus(status: EventStatus): EventStatus | null {
  if (status === 'a_qualifier') return 'en_cours'
  if (status === 'en_cours') return 'resolu'
  return null
}
