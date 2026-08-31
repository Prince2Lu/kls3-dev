import type { OnboardingStage, OtherOnboardingRow } from '@/lib/types/demo'

export const onboardingStages: OnboardingStage[] = [
  { id: 'contact', label: 'Premier contact' },
  { id: 'collecte', label: 'Collecte des informations' },
  { id: 'signature', label: 'Signature de la lettre de mission' },
  { id: 'parametrage', label: 'Paramétrage du dossier' },
  { id: 'active', label: 'Accès client activé' },
]

export const activeOnboardingClientName = 'Thomas Weber'

export const otherOnboardings: OtherOnboardingRow[] = [
  { clientName: 'Élodie Marchand', currentStageLabel: 'Paramétrage du dossier', stageIndex: 3 },
  { clientName: 'Youssef Idrissi', currentStageLabel: 'Premier contact', stageIndex: 0 },
  { clientName: 'Claire Vasseur', currentStageLabel: 'Accès client activé', stageIndex: 4 },
]
