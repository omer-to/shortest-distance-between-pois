import http from 'http'

import { outputResult } from './utils/outputResult'
import { Graph, findShortestAmongAllRoutes } from './solutions'
import { ensureConnection } from './utils/ensureConnection'
import type { Poi } from './typings'

/**
 * The index of the Poi to use as the starting location.
 * Defaults to zero if the option is not provided, or cannot be converted to valid number.
 */
let sourceIndex = 0

if (process.argv[2]) {
      if (process.argv[3]) {
            getSourceIndex(process.argv[3])
      }
      const [, cliIndexOption] = process.argv[2].split('=')
      getSourceIndex(cliIndexOption)
}

/**
 * 
 * @throws RangeError if the provided value is not between 0 and 9.
 */
function getSourceIndex(cliIndexOption: string) {
      const _cliIndexOption = Number(cliIndexOption)
      if (!Number.isNaN(_cliIndexOption)) {
            if (_cliIndexOption < 0 || _cliIndexOption > 9) throw new RangeError('sourceIndex must be between 0 and 9')
            sourceIndex = _cliIndexOption
      }
}

function main() {
      const port = process.env.PORT || 4000
      const serviceName = 'backend'
      http.get(`http://${serviceName}:${port}`, res => {
            let pois = ''
            res.on('data', (chunk: Buffer) => {
                  pois += chunk.toString()
            })
            res.on('end', async () => {
                  const poisArr = JSON.parse(pois) as Poi[]

                  const graph = new Graph(poisArr, sourceIndex),
                        [shortestPath, dist] = graph.findShortestPath()
                  await outputResult(graph.findShortestPath.name, shortestPath, dist)

                  console.log('============================================')

                  const [shortestRoute, distance] = findShortestAmongAllRoutes(poisArr, sourceIndex)
                  await outputResult(findShortestAmongAllRoutes.name, shortestRoute, distance)
            })
      })
}

ensureConnection(main)