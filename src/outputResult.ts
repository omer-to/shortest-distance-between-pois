import path from 'path'
import { writeFile } from 'fs/promises'

import { ensureOutputDirectoryExists, outputDir } from './ensureOutputDirectoryExists'
import type { Poi } from './typings'


/**
 * @description Logs the route and distance, and writes into a file.
 * 
 * @param functionName The name of the function used for finding the shortest path
 * @param route The route that the function finds as the shortest
 * @param distance The total distance for the route
 */
export async function outputResult(functionName: string, route: Poi[], distance: number) {

      console.log(`The shortest route using ${functionName} function to find to the shortest path and total distance:`)
      console.log(JSON.stringify(route, null, 2))
      console.log('The distance (in meters):')
      console.log(distance)

      await ensureOutputDirectoryExists()
      const outputFile = path.join(outputDir, `./${functionName}.json`)
      await writeFile(outputFile, JSON.stringify({ route, distance }, null, 2))
      console.log(`View the results in ${outputFile}`)
}



