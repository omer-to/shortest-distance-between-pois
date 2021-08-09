import path from 'path'
import { mkdir } from 'fs/promises'

export const outputDir = path.resolve(__dirname, '../../output')

export async function ensureOutputDirectoryExists() {
      try {
            await mkdir(outputDir, { recursive: true }) // recursive true,
      } catch (error) { }
}
