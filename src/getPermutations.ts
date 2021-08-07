import { HaversineCalculator } from './HaversineCalculator'
import type { Poi, DistanceCalculator } from './typings'


/**
 * 
 * @param arr The array for which the permutations are calculated
 * @param start The origin Poi to start with
 * @returns A tuple of permutations, and distances
 */
export function getPermutations(arr: Poi[], start: Poi, calculateDistance: DistanceCalculator): [Poi[][], number[]] {
      const permutations: Poi[][] = []
      const distances: number[] = []
      /**
       * 
       * @param arrToSwap The array of Pois to mutate by mutually exchanging the values of two elements 
       * @param indexA The index of a Poi to swap
       * @param indexB The index of a Poi to swap
       */
      function swap(arrToSwap: Poi[], indexA: number, indexB: number) {
            const swapA = arrToSwap[indexA]
            const swapB = arrToSwap[indexB]
            arrToSwap[indexA] = swapB
            arrToSwap[indexB] = swapA
      }
      /**
       * 
       * @param len The length of the array
       * @param heapArr 
       */
      function generate(len: number, heapArr: Poi[]) {
            if (len === 1) {
                  const lenHeapArr = heapArr.length
                  const firstDestination = heapArr[0]
                  let distance = calculateDistance(start, firstDestination)
                  for (let i = 0; i < lenHeapArr - 1; i++) {
                        const source = heapArr[i]
                        const destination = heapArr[i + 1]
                        distance += calculateDistance(source, destination)
                  }
                  distances.push(distance)
                  permutations.push([start, ...heapArr])
                  return
            }

            generate(len - 1, heapArr.slice())

            for (let ind = 0; ind < len - 1; ind++) {
                  if (len % 2)  // If it is an even number
                        swap(heapArr, ind, len - 1)
                  else
                        swap(heapArr, 0, len - 1) // If it is an odd number
                  generate(len - 1, heapArr.slice())
            }
      }

      generate(arr.length, arr.slice())
      return [permutations, distances]
}