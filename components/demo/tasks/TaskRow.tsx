import type { DemoTask, TeamMember } from '@/lib/types/demo'
import { assignLabel, markDoneLabel, unassignedLabel } from '@/lib/data/verticals/finance/affectation-pilotage'
import SourceTag from './SourceTag'
import UrgencyBadge from './UrgencyBadge'

interface TaskRowProps {
  task: DemoTask
  members: TeamMember[]
  onAssign: (id: string, assignee: string | null) => void
  onMarkDone: (id: string) => void
}

export default function TaskRow({ task, members, onAssign, onMarkDone }: TaskRowProps) {
  return (
    <article
      className="rounded-xl border border-white/[0.07] bg-card px-4 py-3.5"
      style={task.done ? { opacity: 0.5 } : undefined}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <SourceTag label={task.sourcePackLabel} />
            <UrgencyBadge urgency={task.urgency} />
          </div>
          <p
            className={`mt-2 text-sm font-medium text-foreground ${task.done ? 'line-through' : ''}`}
          >
            {task.title}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor={`assign-${task.id}`}>
            {assignLabel}
          </label>
          <select
            id={`assign-${task.id}`}
            value={task.assignee ?? ''}
            onChange={(event) => onAssign(task.id, event.target.value || null)}
            className="rounded-lg border border-white/[0.07] bg-[#111111] px-3 py-2 text-xs text-foreground"
          >
            <option value="">{unassignedLabel}</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>

          {!task.done && (
            <button
              type="button"
              onClick={() => onMarkDone(task.id)}
              className="rounded-[100px] px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: '#4B7BF5' }}
            >
              {markDoneLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}