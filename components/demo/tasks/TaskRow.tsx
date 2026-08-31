'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import DemoButton from '@/components/demo/shared/DemoButton'
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
    <article className="rounded-xl border border-white/[0.07] bg-card px-4 py-3.5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <SourceTag label={task.sourcePackLabel} />
            <UrgencyBadge urgency={task.urgency} />
          </div>
          <div className="mt-2 flex items-start gap-2">
            {task.done ? (
              <motion.span
                className="mt-0.5 flex-none"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                aria-hidden
              >
                <Check className="h-4 w-4" style={{ color: '#5DCAA5' }} />
              </motion.span>
            ) : null}
            <p
              className={`text-sm font-medium text-foreground ${task.done ? 'line-through' : ''}`}
              style={{
                opacity: task.done ? 0.5 : 1,
                transition: 'opacity 0.3s ease',
              }}
            >
              {task.title}
            </p>
          </div>
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
            <DemoButton
              type="button"
              onClick={() => onMarkDone(task.id)}
              className="rounded-[100px] px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: '#4B7BF5' }}
            >
              {markDoneLabel}
            </DemoButton>
          )}
        </div>
      </div>
    </article>
  )
}
