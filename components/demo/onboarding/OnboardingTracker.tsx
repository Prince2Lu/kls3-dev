import type { OnboardingStage } from '@/lib/types/demo'
import OnboardingStageStep, {
  type OnboardingConnector,
  type OnboardingStepState,
} from './OnboardingStageStep'

interface OnboardingTrackerProps {
  stages: OnboardingStage[]
  currentStageIndex: number
}

function stepState(index: number, currentStageIndex: number): OnboardingStepState {
  if (index < currentStageIndex) return 'passed'
  if (index === currentStageIndex) return 'current'
  return 'upcoming'
}

function stepConnector(
  index: number,
  lastIndex: number,
  currentStageIndex: number,
): OnboardingConnector {
  if (index === lastIndex) return 'none'
  return index < currentStageIndex ? 'solid' : 'dashed'
}

export default function OnboardingTracker({
  stages,
  currentStageIndex,
}: OnboardingTrackerProps) {
  const lastIndex = stages.length - 1

  return (
    <ol className="flex flex-col lg:flex-row lg:items-start">
      {stages.map((stage, index) => (
        <OnboardingStageStep
          key={stage.id}
          label={stage.label}
          state={stepState(index, currentStageIndex)}
          connector={stepConnector(index, lastIndex, currentStageIndex)}
        />
      ))}
    </ol>
  )
}