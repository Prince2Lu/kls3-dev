import type { DemoTask, TeamMember } from '@/lib/types/demo'
import { doneSectionLabel, sortDoneTasks, sortOpenTasks } from '@/lib/data/verticals/finance/affectation-pilotage'
import TaskRow from './TaskRow'

interface TaskQueueProps {
  tasks: DemoTask[]
  members: TeamMember[]
  onAssign: (id: string, assignee: string | null) => void
  onMarkDone: (id: string) => void
}

export default function TaskQueue({ tasks, members, onAssign, onMarkDone }: TaskQueueProps) {
  const openTasks = sortOpenTasks(tasks)
  const doneTasks = sortDoneTasks(tasks)

  return (
    <section className="rounded-2xl border border-white/[0.07] bg-card p-4 md:p-6">
      <ul className="flex flex-col gap-2">
        {openTasks.map((task) => (
          <li key={task.id}>
            <TaskRow task={task} members={members} onAssign={onAssign} onMarkDone={onMarkDone} />
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-white/[0.07] pt-6">
        <h2
          className="mb-3 font-display font-semibold uppercase text-foreground-muted"
          style={{ fontSize: 13, letterSpacing: '0.08em' }}
        >
          {doneSectionLabel}
        </h2>
        {doneTasks.length === 0 ? (
          <p className="text-xs font-light text-foreground-muted">Aucune tâche traitée pour le moment.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {doneTasks.map((task) => (
              <li key={task.id}>
                <TaskRow task={task} members={members} onAssign={onAssign} onMarkDone={onMarkDone} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}