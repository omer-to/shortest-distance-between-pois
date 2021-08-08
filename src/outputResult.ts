import path from 'path'
import { writeFile } from 'fs/promises'

import { ensureOutputDirectoryExists, outputDir } from './ensureOutputDirectoryExists'
import type { Poi } from './typings'




export async function outputResult(functionName: string, route: Poi[], distance: number) {

      console.log(`The shortest route using ${functionName} function to find to the shortest path and total distance:`)
      console.log(route)
      console.log('The distance (in meters):')
      console.log(distance)

      await ensureOutputDirectoryExists()
      const outputFile = path.join(outputDir, `./${functionName}.json`)
      await writeFile(outputFile, JSON.stringify({ route, distance }, null, 2))
      console.log(`View the results in ${outputFile}`)
}



