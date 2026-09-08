'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { DemoTask, TeamMember } from '@/lib/types/demo'
import { getAffectationPilotagePack } from '@/lib/data/verticals/packs'
import { useDemoVertical } from '@/lib/data/verticals/useDemoVertical'
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
  const vertical = useDemoVertical()
  const { doneSectionLabel, sortDoneTasks, sortOpenTasks } =
    getAffectationPilotagePack(vertical)

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
              <TaskRow
                task={task}
                members={members}
                onAssign={onAssign}
                onMarkDone={onMarkDone}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {doneTasks.length > 0 && (
        <div className="mt-8">
          <p
            className="mb-4 font-medium uppercase text-accent"
            style={{ fontSize: 11, letterSpacing: '0.16em' }}
          >
            <span className="mr-2.5 inline-block h-px w-7 bg-accent align-middle" />
            {doneSectionLabel}
          </p>
          <ul className="flex flex-col gap-2">
            <AnimatePresence initial={false} mode="popLayout">
              {doneTasks.map((task) => (
                <motion.li
                  key={task.id}
                  initial={listItemInitial}
                  animate={listItemAnimate}
                  exit={listItemExit}
                  transition={listItemTransition}
                >
                  <TaskRow
                    task={task}
                    members={members}
                    onAssign={onAssign}
                    onMarkDone={onMarkDone}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}
    </section>
  )
}
