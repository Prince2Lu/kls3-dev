export type AutomationPack = {
  id: string
  numero: string
  titre: string
  description: string
  potentiel: 'Fort' | 'Très fort'
  /** Chemin(s) SVG, viewBox 0 0 24 24. Peut contenir plusieurs sous-tracés "M ...". */
  iconPath: string
}

export const automationPacks: AutomationPack[] = [
  {
    id: 'onboarding',
    numero: '01',
    titre: 'Acte signé → dossier opérationnel',
    description:
      'La signature déclenche le classement, les formalités post-acte (publicité foncière, enregistrement) et la mise à jour des accès dans tous vos outils.',
    potentiel: 'Très fort',
    iconPath: 'M4 12h6l2-3 2 6 2-3h4',
  },
  {
    id: 'documents',
    numero: '02',
    titre: 'Documents manquants',
    description:
      'Détection, relance et rapprochement des pièces attendues, en appui de vos outils actuels.',
    potentiel: 'Fort',
    iconPath: 'M7 3h7l4 4v14H7z M9 12h6 M9 16h6',
  },
  {
    id: 'evenements',
    numero: '03',
    titre: 'Événements clients',
    description:
      "Signature d'un acte, changement de coordonnées bancaires, nouvel intervenant sur un dossier : un seul déclencheur, toutes les actions transverses — immobilier, famille, patrimoine, droit des affaires.",
    potentiel: 'Très fort',
    iconPath: 'M12 3a9 9 0 100 18 9 9 0 000-18z M12 7v5l3.5 2',
  },
  {
    id: 'sync',
    numero: '04',
    titre: 'Synchronisation inter-outils',
    description:
      'Une donnée mise à jour dans un outil se propage automatiquement dans les autres.',
    potentiel: 'Très fort',
    iconPath: 'M4 8h11l-3-3 M20 16H9l3 3',
  },
  {
    id: 'reporting',
    numero: '05',
    titre: 'Reporting transversal',
    description:
      'Une vue unique de vos dossiers, tous pôles confondus, sans consolidation Excel.',
    potentiel: 'Fort',
    iconPath: 'M4 20V10 M11 20V4 M18 20v-7',
  },
  {
    id: 'affectation',
    numero: '06',
    titre: 'Affectation & pilotage',
    description:
      'Répartition des dossiers selon la charge réelle, et suivi automatique des délais légaux (rétractation, purge, formalités).',
    potentiel: 'Fort',
    iconPath: 'M8 8a3 3 0 106 0 3 3 0 10-6 0 M16 16a3 3 0 106 0 3 3 0 10-6 0 M10.2 9.8 13.8 14.2',
  },
]
