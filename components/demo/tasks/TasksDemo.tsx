'use client'

import { useState } from 'react'
import TaskQueue from '@/components/demo/tasks/TaskQueue'
import DemoButton from '@/components/demo/shared/DemoButton'
import {
  initialTasks,
  teamMembers,
} from '@/lib/data/verticals/finance/affectation-pilotage'
import type { DemoTask } from '@/lib/types/demo'

export default function TasksDemo() {
  const [tasks, setTasks] = useState<DemoTask[]>(initialTasks)

  const handleAssign = (id: string, assignee: string | null) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, assignee } : task)),
    )
  }

  const handleMarkDone = (id: string) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, done: true } : task)),
    )
  }

  const handleReset = () => {
    setTasks(initialTasks)
  }

  return (
    <div>
      <TaskQueue
        tasks={tasks}
        members={teamMembers}
        onAssign={handleAssign}
        onMarkDone={handleMarkDone}
      />

      <div className="mt-8">
        <DemoButton
          type="button"
          onClick={handleReset}
          className="text-sm font-light text-foreground-muted transition-colors hover:text-foreground"
        >
          Réinitialiser la démo
        </DemoButton>
      </div>
    </div>
  )
}