import type { OnboardingStage, OtherOnboardingRow } from '@/lib/types/demo'

export const onboardingStages: OnboardingStage[] = [
  {
    id: 'contact',
    label: 'Premier contact',
    actionLabel: 'Qualifier le contact',
    actionDescription: 'Le lead est qualifié et un rendez-vous est proposé automatiquement.',
    doneLabel: 'Contact qualifié',
  },
  {
    id: 'collecte',
    label: 'Collecte des informations',
    actionLabel: 'Envoyer le lien de collecte',
    actionDescription:
      "Le client reçoit un lien sécurisé pour transmettre ses informations et pièces d'identité.",
    doneLabel: 'Lien envoyé',
  },
  {
    id: 'signature',
    label: 'Signature de la lettre de mission',
    actionLabel: 'Envoyer pour signature',
    actionDescription: 'La lettre de mission part en signature électronique.',
    doneLabel: 'Envoyé en signature',
  },
  {
    id: 'parametrage',
    label: 'Paramétrage du dossier',
    actionLabel: 'Créer le dossier dans les outils internes',
    actionDescription: 'Le dossier est créé et synchronisé automatiquement dans les outils du cabinet.',
    doneLabel: 'Dossier créé',
  },
  {
    id: 'active',
    label: 'Accès client activé',
    actionLabel: 'Envoyer les accès',
    actionDescription: "Le client reçoit ses identifiants d'accès au portail.",
    doneLabel: 'Accès envoyés',
  },
]

export const activeOnboardingClientName = 'Thomas Weber'

export const otherOnboardings: OtherOnboardingRow[] = [
  { clientName: 'Élodie Marchand', currentStageLabel: 'Paramétrage du dossier', stageIndex: 3 },
  { clientName: 'Youssef Idrissi', currentStageLabel: 'Premier contact', stageIndex: 0 },
  { clientName: 'Claire Vasseur', currentStageLabel: 'Accès client activé', stageIndex: 4 },
]
