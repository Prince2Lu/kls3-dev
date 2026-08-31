import type { DemoTask, TaskUrgency, TeamMember } from '@/lib/types/demo'

export const teamMembers: TeamMember[] = [
  { id: 'camille', name: 'Camille Perrot' },
  { id: 'hugo', name: 'Hugo Lambert' },
  { id: 'lea', name: 'Léa Marchetti' },
]

export const initialTasks: DemoTask[] = [
  {
    id: 't1',
    title: 'Relancer Sophie Alaoui — pièces manquantes',
    sourcePackLabel: 'Documents manquants',
    urgency: 'urgent',
    assignee: null,
    done: false,
  },
  {
    id: 't2',
    title: "Qualifier l'événement : nouvel actionnaire — Marc Dubreuil",
    sourcePackLabel: 'Événements clients',
    urgency: 'urgent',
    assignee: null,
    done: false,
  },
  {
    id: 't3',
    title: "Vérifier l'échec de synchronisation — Espace de stockage",
    sourcePackLabel: 'Synchronisation inter-outils',
    urgency: 'a_traiter',
    assignee: null,
    done: false,
  },
  {
    id: 't4',
    title: 'Envoyer les accès à Thomas Weber',
    sourcePackLabel: 'Onboarding client',
    urgency: 'a_traiter',
    assignee: null,
    done: false,
  },
  {
    id: 't5',
    title: 'Vérifier le rapport hebdomadaire avant diffusion interne',
    sourcePackLabel: 'Reporting transversal',
    urgency: 'a_traiter',
    assignee: null,
    done: false,
  },
  {
    id: 't6',
    title: 'Planifier la revue du dossier Nadia Benali',
    sourcePackLabel: 'Événements clients',
    urgency: 'en_attente',
    assignee: null,
    done: false,
  },
  {
    id: 't7',
    title: 'Confirmer la réception du dernier document de Julien Fontaine',
    sourcePackLabel: 'Documents manquants',
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
  'Les actions en attente de tous vos modules, réunies au même endroit et triées par urgence.'

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
