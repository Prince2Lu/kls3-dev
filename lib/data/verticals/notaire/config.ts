import type { VerticalConfig } from '@/lib/types/demo'

export const notaireConfig: VerticalConfig = {
  id: 'notaire',
  label: 'Étude notariale',
  scenarioCompanyName: 'Étude notariale Dubois & Associés',
  compositeScoreLabel: 'Indice de fluidité opérationnelle',
  compositeScoreValue: 64,
  subScores: [
    { label: 'Dossiers à jour', value: 72 },
    { label: 'Relances en attente', value: 58 },
    { label: 'Visibilité des délais', value: 61 },
  ],
  counters: [
    { label: 'Actes suivis', value: 5 },
    { label: 'Pièces en attente', value: 11 },
    { label: 'Relances programmées', value: 3 },
    { label: 'Modules actifs', value: 6 },
  ],
  modules: [
    {
      id: 'documents-manquants',
      label: 'Documents manquants',
      description:
        'Collecte et relance des pièces avant signature, en temps réel.',
      status: 'disponible',
      route: '/demo/notaire/documents-manquants',
    },
    {
      id: 'onboarding',
      label: 'Acte signé → dossier opérationnel',
      description:
        'La signature déclenche le classement, les formalités post-acte et la mise à jour des accès dans tous les outils.',
      status: 'disponible',
      route: '/demo/notaire/onboarding',
    },
    {
      id: 'evenements-clients',
      label: 'Événements clients',
      description:
        'Détection et propagation des changements qui impactent un dossier, tous pôles confondus.',
      status: 'disponible',
      route: '/demo/notaire/evenements-clients',
    },
    {
      id: 'synchronisation',
      label: 'Synchronisation inter-outils',
      description: "Circulation fluide de l'information entre vos outils métier.",
      status: 'disponible',
      route: '/demo/notaire/synchronisation',
    },
    {
      id: 'reporting',
      label: 'Reporting transversal',
      description: "Vue consolidée de l'activité, sans reporting manuel.",
      status: 'disponible',
      route: '/demo/notaire/reporting',
    },
    {
      id: 'affectation-pilotage',
      label: 'Affectation & suivi des délais',
      description:
        "Une file d'actions unique, triée par urgence, avec les délais légaux visibles.",
      status: 'disponible',
      route: '/demo/notaire/affectation-pilotage',
    },
  ],
}
