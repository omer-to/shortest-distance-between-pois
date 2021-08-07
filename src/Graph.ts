import { HaversineCalculator } from './HaversineCalculator'

import type { Poi, Point, DistanceCalculator } from './typings'

type IndexedTarget = Poi & { distance: number, index: number }
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

      findShortestPath(): Poi[] {
            const source = this.visited[this.visited.length - 1]
            const nextClosestPoi = this.findNextClosestPoi(source)
            this.visitNextClosestPoi(nextClosestPoi)
            if (this.unvisited.length) {
                  return this.findShortestPath()
            } else {
                  return this.visited
            }
      }

      private findNextClosestPoi(source: Poi): IndexedTarget {
            return this.unvisited.reduce<IndexedTarget>((currentClosestPoi, candidatePoi, index) => {
                  const distance = this.calculateDistance(source, candidatePoi)
                  if (distance < currentClosestPoi.distance) {
                        currentClosestPoi = { ...candidatePoi, distance, index }
                  }
                  return currentClosestPoi
            }, { distance: Infinity } as IndexedTarget)
      }

      private visitNextClosestPoi(nextPoiWithIndex: IndexedTarget) {
            const { index, ...nextPoi } = nextPoiWithIndex
            this.visited.push(nextPoi)
            this.unvisited.splice(index, 1)
      }
}