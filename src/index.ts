import http from 'http'

import { Graph } from './Graph'
import type { Poi } from './typings'

const port = 4000
http.get(`http://localhost:${port}`, res => {
      let pois = ''
      res.on('data', (chunk: Buffer) => {
            pois += chunk.toString()
      })
      res.on('end', () => {
            const poisArr = JSON.parse(pois) as Poi[]
            const graph = new Graph(poisArr, 0)
            const shortestPath = graph.findShortestPath()
            console.log(shortestPath)
      })
})