import type { DemoTask, TaskUrgency, TeamMember } from '@/lib/types/demo'

function addDays(base: Date, days: number): Date {
  const date = new Date(base.getTime())
  date.setUTCDate(date.getUTCDate() + days)
  return date
}

function formatFrDate(date: Date): string {
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  return `${day}/${month}/${year}`
}

/** Jour de référence démo (fixe) pour éviter un décalage SSR / client. */
const DEMO_TODAY = new Date(Date.UTC(2026, 8, 8))
const dateRetractation = formatFrDate(addDays(DEMO_TODAY, 10))
const datePurge = formatFrDate(addDays(DEMO_TODAY, 31))
const dateFormalites = formatFrDate(addDays(DEMO_TODAY, 45))

export const teamMembers: TeamMember[] = [
  { id: 'dubois', name: 'Maître A. Dubois' },
  { id: 'martin', name: 'Camille Martin' },
  { id: 'roux', name: 'Julien Roux' },
]

export const initialTasks: DemoTask[] = [
  {
    id: 't1',
    title: `Suivre le délai de rétractation - SCI Les Tilleuls - échéance ${dateRetractation}`,
    sourcePackLabel: 'Affectation & suivi des délais',
    urgency: 'urgent',
    assignee: null,
    done: false,
  },
  {
    id: 't2',
    title: `Préparer la purge des hypothèques - échéance ${datePurge}`,
    sourcePackLabel: 'Affectation & suivi des délais',
    urgency: 'urgent',
    assignee: null,
    done: false,
  },
  {
    id: 't3',
    title: 'Relancer SCI Les Tilleuls - pièces manquantes avant signature',
    sourcePackLabel: 'Documents manquants',
    urgency: 'urgent',
    assignee: null,
    done: false,
  },
  {
    id: 't4',
    title: `Lancer les formalités post-acte - publicité foncière - échéance ${dateFormalites}`,
    sourcePackLabel: 'Acte signé → dossier opérationnel',
    urgency: 'a_traiter',
    assignee: null,
    done: false,
  },
  {
    id: 't5',
    title: "Qualifier l'événement : nouvel intervenant - SCI Du Parc",
    sourcePackLabel: 'Événements clients',
    urgency: 'a_traiter',
    assignee: null,
    done: false,
  },
  {
    id: 't6',
    title: 'Vérifier la synchronisation GED après signature',
    sourcePackLabel: 'Synchronisation inter-outils',
    urgency: 'a_traiter',
    assignee: null,
    done: false,
  },
  {
    id: 't7',
    title: 'Contrôler le rapport transversal avant diffusion interne',
    sourcePackLabel: 'Reporting transversal',
    urgency: 'en_attente',
    assignee: null,
    done: false,
  },
]

export const urgencyOrder: Record<TaskUrgency, number> = {
  urgent: 0,
  a_traiter: 1,
  en_attente: 2,
}

export const urgencyLabels: Record<TaskUrgency, string> = {
  urgent: 'Urgent',
  a_traiter: 'À traiter',
  en_attente: 'En attente',
}

export const unassignedLabel = 'Non assigné'
export const markDoneLabel = 'Marquer comme traité'
export const doneSectionLabel = 'Traité'
export const assignLabel = 'Assigner à'
export const introText =
  'Les actions en attente et les délais légaux (rétractation, purge, formalités), réunis au même endroit et triés par urgence.'

export function sortOpenTasks(tasks: DemoTask[]): DemoTask[] {
  return tasks
    .filter((task) => !task.done)
    .slice()
    .sort((a, b) => {
      const byUrgency = urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
      if (byUrgency !== 0) return byUrgency
      return originalIndex(a.id) - originalIndex(b.id)
    })
}

export function sortDoneTasks(tasks: DemoTask[]): DemoTask[] {
  return tasks
    .filter((task) => task.done)
    .slice()
    .sort((a, b) => originalIndex(a.id) - originalIndex(b.id))
}

function originalIndex(id: string): number {
  const index = initialTasks.findIndex((task) => task.id === id)
  return index === -1 ? Number.MAX_SAFE_INTEGER : index
}
