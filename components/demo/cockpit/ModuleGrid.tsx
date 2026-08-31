import type { PackModuleConfig } from '@/lib/types/demo'
import ModuleCard from './ModuleCard'

interface ModuleGridProps {
  modules: PackModuleConfig[]
}

export default function ModuleGrid({ modules }: ModuleGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {modules.map((module, index) => (
        <ModuleCard key={module.id} module={module} index={index} />
      ))}
    </div>
  )
}
