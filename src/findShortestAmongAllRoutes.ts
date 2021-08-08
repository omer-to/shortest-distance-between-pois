import { HaversineCalculator } from './utils/HaversineCalculator'
import { getPermutations } from './getPermutations'

import type { Poi, DistanceCalculator, RouteAndDistance } from './typings'

export function findShortestAmongAllRoutes(pois: Poi[], sourceIndex: number, calculateDistance: DistanceCalculator = HaversineCalculator.distanceBetween): RouteAndDistance {
      const arr = pois.slice(0, sourceIndex).concat(pois.slice(sourceIndex + 1)) // Exclude the starting point and make a shallow copy
      const start = pois[sourceIndex]

      const [permutations, distances] = getPermutations(arr, start, calculateDistance)

      let shortestDistance = Infinity
      let shortestRouteIndex = 0
      const lenDistances = distances.length
      // Math.min throws a RangeError for exceeding maximum call stack size.
      for (let index = 0; index < lenDistances; index++) {
            const distance = distances[index]
            if (distance < shortestDistance) {
                  shortestDistance = distance
                  shortestRouteIndex = index
            }
      }
      const shortestRoute = permutations[shortestRouteIndex]

      return [shortestRoute, shortestDistance]
}

