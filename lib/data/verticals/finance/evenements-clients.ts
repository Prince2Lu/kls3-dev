import type {
  ClientEvent,
  EventColumnConfig,
  EventStatus,
  EventTypeDetail,
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

export const eventTypeDetails: Record<string, EventTypeDetail> = {
  "Changement d'actionnaire": {
    detectedInfo: 'Nouvel actionnaire enregistré : 35 % des parts transférées.',
    qualificationNote:
      "Vérification de l'origine des fonds et mise à jour du registre des bénéficiaires effectifs.",
    resolutionNote: 'Registre des bénéficiaires effectifs mis à jour, dossier conforme.',
  },
  'Document expiré': {
    detectedInfo: "Pièce d'identité du dirigeant arrivée à expiration.",
    qualificationNote: 'Demande de renouvellement envoyée, document en attente de réception.',
    resolutionNote: 'Nouveau document reçu et classé, dossier à jour.',
  },
  'Changement de dirigeant': {
    detectedInfo: 'Nouveau dirigeant nommé, publication au registre du commerce détectée.',
    qualificationNote: 'Vérification des pouvoirs de signature et mise à jour des accès.',
    resolutionNote: 'Pouvoirs de signature mis à jour, nouveau dirigeant activé.',
  },
  'Modification des statuts': {
    detectedInfo: "Modification statutaire déposée : changement d'objet social.",
    qualificationNote: 'Analyse des statuts modifiés et mise en cohérence du dossier.',
    resolutionNote: 'Statuts à jour dans le dossier, aucune incohérence détectée.',
  },
  'Changement de siège social': {
    detectedInfo: 'Nouvelle adresse de siège social publiée.',
    qualificationNote: "Mise à jour de l'adresse dans l'ensemble des documents actifs.",
    resolutionNote: 'Adresse mise à jour partout où elle apparaît.',
  },
  'Opération inhabituelle': {
    detectedInfo: 'Mouvement financier significatif détecté, hors profil habituel.',
    qualificationNote: "Analyse du contexte de l'opération avant qualification.",
    resolutionNote: 'Opération analysée et documentée, aucune anomalie retenue.',
  },
}

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
