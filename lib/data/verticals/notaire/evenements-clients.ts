import type {
  ClientEvent,
  EventColumnConfig,
  EventStatus,
  EventTypeDetail,
  EventTypePoolEntry,
} from '@/lib/types/demo'

export const initialEvents: ClientEvent[] = [
  {
    id: 'evt-1',
    clientName: 'SCI Les Tilleuls',
    eventType: "Signature d'acte",
    status: 'a_qualifier',
  },
  {
    id: 'evt-2',
    clientName: 'M. et Mme Bertrand',
    eventType: 'Changement de coordonnées bancaires',
    status: 'a_qualifier',
  },
  {
    id: 'evt-3',
    clientName: 'SCI Du Parc',
    eventType: 'Nouvel intervenant sur un dossier',
    status: 'en_cours',
  },
  {
    id: 'evt-4',
    clientName: 'Famille Lefort',
    eventType: "Signature d'acte",
    status: 'en_cours',
  },
  {
    id: 'evt-5',
    clientName: 'SCI Les Erables',
    eventType: 'Changement de coordonnées bancaires',
    status: 'resolu',
  },
]

export const NEW_EVENT_HIGHLIGHT_MS = 3000

export const eventPool: EventTypePoolEntry[] = [
  { clientName: 'SCI Les Tilleuls', eventType: "Signature d'acte" },
  { clientName: 'M. et Mme Bertrand', eventType: 'Changement de coordonnées bancaires' },
  { clientName: 'SCI Du Parc', eventType: 'Nouvel intervenant sur un dossier' },
  { clientName: 'Famille Lefort', eventType: "Signature d'acte" },
  { clientName: 'SCI Les Erables', eventType: 'Nouvel intervenant sur un dossier' },
]

export const columnConfig: EventColumnConfig[] = [
  { status: 'a_qualifier', label: 'Événement détecté' },
  { status: 'en_cours', label: 'En traitement' },
  { status: 'resolu', label: 'Propagé' },
]

export const eventTypeDetails: Record<string, EventTypeDetail> = {
  "Signature d'acte": {
    detectedInfo:
      'Acte de vente signé (285 000 €) - impact sur le pôle immobilier et le suivi des formalités.',
    qualificationNote:
      'Propagation vers immobilier, patrimoine et suivi des délais post-acte.',
    resolutionNote:
      'Événement propagé aux pôles immobilier et patrimoine. Dossier opérationnel à jour.',
  },
  'Changement de coordonnées bancaires': {
    detectedInfo:
      'Nouvelles coordonnées bancaires reçues pour le dossier - impact séquestre et formalités.',
    qualificationNote:
      'Vérification puis propagation aux pôles immobilier et droit des affaires.',
    resolutionNote:
      'Coordonnées mises à jour et propagées. Aucune relance manuelle nécessaire.',
  },
  'Nouvel intervenant sur un dossier': {
    detectedInfo:
      'Nouvel intervenant déclaré sur le dossier - impact accès et coordination inter-pôles.',
    qualificationNote:
      'Mise à jour des accès et notification des pôles famille, patrimoine et immobilier.',
    resolutionNote:
      'Intervenant ajouté, accès synchronisés, pôles concernés informés.',
  },
}

export const eventTypeIcons: Record<string, string> = {
  "Signature d'acte": 'ti-file-description',
  'Changement de coordonnées bancaires': 'ti-building',
  'Nouvel intervenant sur un dossier': 'ti-users',
}

export const eventActionLabels: Partial<Record<EventStatus, string>> = {
  a_qualifier: 'Traiter',
  en_cours: 'Marquer comme propagé',
}

export function nextEventStatus(status: EventStatus): EventStatus | null {
  if (status === 'a_qualifier') return 'en_cours'
  if (status === 'en_cours') return 'resolu'
  return null
}
