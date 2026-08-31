'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { DemoTask, TeamMember } from '@/lib/types/demo'
import {
  doneSectionLabel,
  sortDoneTasks,
  sortOpenTasks,
} from '@/lib/data/verticals/finance/affectation-pilotage'
import {
  listItemAnimate,
  listItemExit,
  listItemInitial,
  listItemTransition,
} from '@/components/demo/shared/motionPresets'
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
        <AnimatePresence initial={false} mode="popLayout">
          {openTasks.map((task) => (
            <motion.li
              key={task.id}
              initial={listItemInitial}
              animate={listItemAnimate}
              exit={listItemExit}
              transition={listItemTransition}
            >
              <TaskRow task={task} members={members} onAssign={onAssign} onMarkDone={onMarkDone} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="mt-6 border-t border-white/[0.07] pt-6">
        <h2
          className="mb-3 font-display font-semibold uppercase text-foreground-muted"
          style={{ fontSize: 13, letterSpacing: '0.08em' }}
        >
          {doneSectionLabel}
        </h2>
        <ul className="flex flex-col gap-2">
          <AnimatePresence initial={false} mode="popLayout">
            {doneTasks.length === 0 ? (
              <motion.li
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={listItemTransition}
                className="text-xs font-light text-foreground-muted"
              >
                Aucune tâche traitée pour le moment.
              </motion.li>
            ) : (
              doneTasks.map((task) => (
                <motion.li
                  key={task.id}
                  initial={listItemInitial}
                  animate={listItemAnimate}
                  exit={listItemExit}
                  transition={listItemTransition}
                >
                  <TaskRow task={task} members={members} onAssign={onAssign} onMarkDone={onMarkDone} />
                </motion.li>
              ))
            )}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  )
}