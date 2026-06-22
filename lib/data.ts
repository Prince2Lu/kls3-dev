import { type Pillar } from './types'

export const pillars: Pillar[] = [
  {
    id: 'gestion-de-projet',
    label: 'Pilier 1',
    title: 'Gestion de projet',
    description: 'Nous prenons en charge le pilotage de vos projets complexes : cadrage, planification, coordination des équipes, gestion des parties prenantes et reporting. Vous gardez la vision, nous gérons l\'exécution.',
    tag: 'Mission & accompagnement',
    icon: 'Briefcase',
    color: 'purple',
    href: '/gestion-de-projet',
  },
  {
    id: 'transformation-digitale',
    label: 'Pilier 2',
    title: 'Transformation digitale',
    description: 'Audit de vos processus, déploiement d\'agents IA, automatisation des tâches répétitives et intégration d\'outils adaptés à votre métier. Nous ne vendons pas de la technologie — nous résolvons vos problèmes opérationnels.',
    tag: 'IA & automatisation',
    icon: 'Bot',
    color: 'cyan',
    href: '/transformation-digitale',
  },
  {
    id: 'solutions-saas',
    label: 'Pilier 3',
    title: 'Solutions SaaS',
    description: 'Vous avez identifié un besoin métier qu\'aucun outil du marché ne couvre vraiment ? Nous concevons et développons votre solution sur mesure — de la spécification au déploiement.',
    tag: 'De l\'idée au produit',
    icon: 'Monitor',
    color: 'green',
    href: '/solutions-saas',
  },
]

export const sectors = [
  'Cabinets d\'avocats',
  'Expertise comptable',
  'Corporate services',
  'RH & recrutement',
]
