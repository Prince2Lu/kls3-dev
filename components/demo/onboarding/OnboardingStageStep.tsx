import { Check, Circle, Play } from 'lucide-react'

export type OnboardingStepState = 'passed' | 'current' | 'upcoming'
export type OnboardingConnector = 'solid' | 'dashed' | 'none'

interface OnboardingStageStepProps {
  label: string
  state: OnboardingStepState
  connector: OnboardingConnector
}

export default function OnboardingStageStep({
  label,
  state,
  connector,
}: OnboardingStageStepProps) {
  const isPassed = state === 'passed'
  const isCurrent = state === 'current'
  const showConnector = connector !== 'none'

  const markerColor = isPassed ? '#5DCAA5' : isCurrent ? '#4B7BF5' : 'rgba(240,237,232,0.25)'
  const connectorSolid = connector === 'solid'

  return (
    <li
      className="flex lg:min-w-0 lg:flex-1"
      aria-current={isCurrent ? 'step' : undefined}
    >
      <div
        className="flex w-full gap-4 rounded-2xl p-3 lg:flex-col lg:items-center lg:gap-3 lg:p-2"
        style={isCurrent ? { background: 'rgba(75,123,245,0.08)' } : undefined}
      >
        <div className="flex flex-col items-center self-stretch lg:w-full lg:flex-row">
          <span
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full border"
            style={{
              borderColor: markerColor,
              background: isPassed || isCurrent ? `${markerColor}1F` : 'transparent',
              color: markerColor,
            }}
            aria-hidden
          >
            {isPassed && <Check className="h-4 w-4" />}
            {isCurrent && <Play className="h-3.5 w-3.5 fill-current" />}
            {state === 'upcoming' && <Circle className="h-3 w-3" />}
          </span>

          {showConnector && (
            <>
              <span
                className="mt-1 min-h-6 w-px flex-1 lg:hidden"
                style={
                  connectorSolid
                    ? { background: '#5DCAA5' }
                    : {
                        backgroundImage:
                          'repeating-linear-gradient(to bottom, rgba(240,237,232,0.25) 0 4px, transparent 4px 8px)',
                      }
                }
                aria-hidden
              />
              <span
                className="ml-3 hidden h-px flex-1 lg:block"
                style={
                  connectorSolid
                    ? { background: '#5DCAA5' }
                    : {
                        backgroundImage:
                          'repeating-linear-gradient(to right, rgba(240,237,232,0.25) 0 4px, transparent 4px 8px)',
                      }
                }
                aria-hidden
              />
            </>
          )}
        </div>

        <p
          className={`pt-0.5 text-sm lg:pt-0 lg:text-center ${
            isCurrent ? 'font-medium text-foreground' : 'font-light text-foreground-muted'
          }`}
        >
          {label}
        </p>
      </div>
    </li>
  )
}