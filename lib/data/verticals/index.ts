import type { VerticalConfig } from '@/lib/types/demo'
import { financeConfig } from './finance/config'

const verticalConfigs: Record<string, VerticalConfig> = {
  finance: financeConfig,
}

export function getVerticalConfig(id: string): VerticalConfig | undefined {
  return verticalConfigs[id]
}

export function getAllVerticalIds(): string[] {
  return Object.keys(verticalConfigs)
}
