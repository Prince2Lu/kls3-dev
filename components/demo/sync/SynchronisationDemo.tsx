'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import DemoLayout from '@/components/demo/DemoLayout'
import ConnectedToolsPanel from '@/components/demo/sync/ConnectedToolsPanel'
import SourceEventPanel from '@/components/demo/sync/SourceEventPanel'
import {
  connectedTools,
  getInitialToolStatuses,
  sourceEventFields,
  sourceEventSubtitle,
  sourceEventTitle,
  syncDelays,
} from '@/lib/data/verticals/finance/synchronisation'
import type { ToolSyncStatus } from '@/lib/types/demo'

export default function SynchronisationDemo() {
  const [saved, setSaved] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const [toolStatuses, setToolStatuses] = useState<Record<string, ToolSyncStatus>>(
    getInitialToolStatuses,
  )
  const timeoutsRef = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id))
    timeoutsRef.current = []
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const handleSave = () => {
    if (saved) return

    clearTimers()
    setSaved(true)
    setToolStatuses(
      Object.fromEntries(connectedTools.map((tool) => [tool.id, 'en_cours' as const])),
    )

    connectedTools.forEach((tool) => {
      const timeoutId = window.setTimeout(() => {
        setToolStatuses((prev) => ({ ...prev, [tool.id]: 'synchronise' }))
      }, syncDelays[tool.id] ?? 1000)
      timeoutsRef.current.push(timeoutId)
    })
  }

  const handleReset = () => {
    clearTimers()
    setSaved(false)
    setToolStatuses(getInitialToolStatuses())
    setFormKey((key) => key + 1)
  }

  return (
    <div>
      <DemoLayout
        left={
          <SourceEventPanel
            key={formKey}
            title={sourceEventTitle}
            subtitle={sourceEventSubtitle}
            fields={sourceEventFields}
            saved={saved}
            onSave={handleSave}
          />
        }
        right={<ConnectedToolsPanel tools={connectedTools} statuses={toolStatuses} />}
      />

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={handleReset}
          className="text-sm font-light text-foreground-muted transition-colors hover:text-foreground"
        >
          Réinitialiser la démo
        </button>
      </div>
    </div>
  )
}