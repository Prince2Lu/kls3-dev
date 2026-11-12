import { existsSync } from 'node:fs'
import path from 'node:path'

// Les visuels réels remplacent les placeholders dès qu'ils sont déposés dans public/
export function hasPublicFile(src: string): boolean {
  return existsSync(path.join(process.cwd(), 'public', src))
}
