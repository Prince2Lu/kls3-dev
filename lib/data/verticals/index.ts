import type { VerticalConfig } from '@/lib/types/demo'
import { financeConfig } from './finance/config'
import { notaireConfig } from './notaire/config'

const verticalConfigs: Record<string, VerticalConfig> = {
  finance: financeConfig,
  notaire: notaireConfig,
}

export function getVerticalConfig(id: string): VerticalConfig | undefined {
  return verticalConfigs[id]
}

export function getAllVerticalIds(): string[] {
  return Object.keys(verticalConfigs)
}
