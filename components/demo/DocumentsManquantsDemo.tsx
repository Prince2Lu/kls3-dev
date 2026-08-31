'use client'

import { useCallback, useState } from 'react'
import type { DemoDocumentItem } from '@/lib/types/demo'
import {
  getLiveDossierRow,
  initialDocuments,
  interactiveClientContact,
  interactiveClientName,
  interactiveDeadlineLabel,
  reminderSteps,
  staticDossiers,
} from '@/lib/data/verticals/finance/documents-manquants'
import CabinetDashboardPanel from './CabinetDashboardPanel'
import ClientPortalPanel from './ClientPortalPanel'
import DemoLayout from './DemoLayout'

interface DocumentsManquantsDemoProps {
  cabinetName: string
}

export default function DocumentsManquantsDemo({ cabinetName }: DocumentsManquantsDemoProps) {
  const [items, setItems] = useState<DemoDocumentItem[]>(initialDocuments)

  const onToggle = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, received: !item.received } : item)),
    )
  }, [])

  const liveRow = getLiveDossierRow(items)

  return (
    <DemoLayout
      left={
        <ClientPortalPanel
          clientName={interactiveClientName}
          clientContact={interactiveClientContact}
          deadlineLabel={interactiveDeadlineLabel}
          items={items}
          onToggle={onToggle}
        />
      }
      right={
        <CabinetDashboardPanel
          cabinetName={cabinetName}
          liveRow={liveRow}
          liveItems={items}
          staticRows={staticDossiers}
          reminders={reminderSteps}
        />
      }
    />
  )
}
