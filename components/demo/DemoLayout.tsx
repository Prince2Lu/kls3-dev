import type { ReactNode } from 'react'

interface DemoLayoutProps {
  left: ReactNode
  right: ReactNode
}

export default function DemoLayout({ left, right }: DemoLayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
      <div className="min-w-0">{left}</div>
      <div className="min-w-0">{right}</div>
    </div>
  )
}
