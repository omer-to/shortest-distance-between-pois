import { HaversineCalculator } from './HaversineCalculator'

import type { Poi, Point, DistanceCalculator } from './typings'


export class Graph {
      private nodes: Poi[]
      private visited: Poi[]
      private unvisited: Poi[]
      private calculateDistance: DistanceCalculator
      constructor(pois: Poi[], sourceIndex: number, calculateDistance: DistanceCalculator) {
            // Exclude the starting Poi and shallow copy
            this.nodes = pois.slice(0, sourceIndex).concat(pois.slice(sourceIndex + 1))
            this.visited = [pois[sourceIndex]]
            this.unvisited = this.nodes
            this.calculateDistance = calculateDistance || HaversineCalculator.distanceBetween
      }
}