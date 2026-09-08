import type { OnboardingStage, OtherOnboardingRow } from '@/lib/types/demo'

export const demoHeadingPrefix = 'Acte signé'
export const demoIntro =
  'La signature déclenche le classement, les formalités post-acte et la mise à jour des accès dans tous les outils.'
export const otherSectionLabel = 'Autres dossiers post-acte en cours'

export const onboardingStages: OnboardingStage[] = [
  {
    id: 'signature',
    label: 'Signature',
    actionLabel: "Confirmer la signature de l'acte",
    actionDescription:
      "L'acte de vente est signé. Le dossier opérationnel se met en mouvement.",
    doneLabel: 'Acte signé',
  },
  {
    id: 'classement',
    label: 'Classement automatique',
    actionLabel: 'Lancer le classement',
    actionDescription:
      "Les pièces de l'acte sont classées automatiquement dans la GED et le dossier numérique.",
    doneLabel: 'Dossier classé',
  },
  {
    id: 'formalites',
    label: 'Formalités post-acte',
    actionLabel: 'Déclencher les formalités',
    actionDescription:
      'Publicité foncière et enregistrement sont initiés, avec suivi des échéances associées.',
    doneLabel: 'Formalités lancées',
  },
  {
    id: 'acces',
    label: 'Mise à jour des accès',
    actionLabel: 'Mettre à jour les accès',
    actionDescription:
      'Les accès collaborateurs et clients sont ajustés selon le nouveau statut du dossier.',
    doneLabel: 'Accès à jour',
  },
  {
    id: 'actif',
    label: 'Dossier actif',
    actionLabel: 'Activer le dossier',
    actionDescription:
      'Le dossier est opérationnel : suivi des délais, formalités et échanges centralisés.',
    doneLabel: 'Dossier actif',
  },
]

export const activeOnboardingClientName = 'SCI Les Tilleuls'

export const otherOnboardings: OtherOnboardingRow[] = [
  {
    clientName: 'M. et Mme Bertrand',
    currentStageLabel: 'Formalités post-acte',
    stageIndex: 2,
  },
  {
    clientName: 'SCI Du Parc',
    currentStageLabel: 'Signature',
    stageIndex: 0,
  },
  {
    clientName: 'Famille Lefort',
    currentStageLabel: 'Dossier actif',
    stageIndex: 4,
  },
]
