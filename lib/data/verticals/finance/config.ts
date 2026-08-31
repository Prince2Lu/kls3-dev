import type { VerticalConfig } from '@/lib/types/demo'

export const financeConfig: VerticalConfig = {
  id: 'finance',
  label: 'Finance & Corporate Services',
  scenarioCompanyName: 'Cabinet Lefèvre et associés',
  compositeScoreLabel: 'Indice de fluidité opérationnelle',
  compositeScoreValue: 62,
  subScores: [
    { label: 'Dossiers à jour', value: 70 },
    { label: 'Relances en attente', value: 55 },
    { label: 'Visibilité des flux', value: 60 },
  ],
  counters: [
    { label: 'Dossiers suivis', value: 5 },
    { label: 'Pièces en attente', value: 12 },
    { label: 'Relances programmées', value: 3 },
    { label: 'Modules actifs', value: 5 },
  ],
  modules: [
    {
      id: 'documents-manquants',
      label: 'Documents manquants',
      description: 'Collecte et relance des pièces avant clôture, en temps réel.',
      status: 'disponible',
      route: '/demo/finance/documents-manquants',
    },
    {
      id: 'onboarding',
      label: 'Onboarding client',
      description: "Intégration structurée d'un nouveau dossier, de A à Z.",
      status: 'disponible',
      route: '/demo/finance/onboarding',
    },
    {
      id: 'evenements-clients',
      label: 'Événements clients',
      description: 'Détection et traitement des changements qui impactent un dossier.',
      status: 'disponible',
      route: '/demo/finance/evenements-clients',
    },
    {
      id: 'synchronisation',
      label: 'Synchronisation inter-outils',
      description: "Circulation fluide de l'information entre vos outils métier.",
      status: 'disponible',
      route: '/demo/finance/synchronisation',
    },
    {
      id: 'reporting',
      label: 'Reporting transversal',
      description: "Vue consolidée de l'activité, sans reporting manuel.",
      status: 'disponible',
      route: '/demo/finance/reporting',
    },
    {
      id: 'affectation-pilotage',
      label: 'Affectation & pilotage',
      description: "Une file d'actions unique, triée par urgence.",
      status: 'a_venir',
      route: '/demo/finance/affectation-pilotage',
    },
  ],
}
