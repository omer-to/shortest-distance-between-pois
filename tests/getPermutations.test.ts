import { getPermutations } from '../src/getPermutations'
import { HaversineCalculator } from '../src/HaversineCalculator'

const start = {
      poiName: '1',
      latitude: 0,
      longitude: 0
}
const pois = [
      {
            poiName: '2',
            latitude: 0,
            longitude: 0
      },
      {
            poiName: '3',
            latitude: 1,
            longitude: 1
      },
      {
            poiName: '4',
            latitude: 2,
            longitude: 2
      }
]

const output = getPermutations(pois, start, HaversineCalculator.distanceBetween)
const [permutations, distances] = output


describe('Test Cases for getPermutations', () => {
      test('Should produce array type', () => {
            expect(output).toBeInstanceOf(Array)
      })

      test('Should produce an array of length 2 (a typle with two elements)', () => {
            expect(output).toHaveLength(2)
      })

      test('The length of distances should be equal to that of permutations', () => {
            expect(distances.length).toBe(permutations.length)
      })

      test('All of the elements of the distances array should be a number', () => {
            distances.forEach(distance => {
                  expect(typeof distance).toBe('number')
            })
      })

      test('None of the elements of the distances array should be NaN', () => {
            distances.forEach(distance => {
                  expect(Number.isNaN(distance)).not.toBe(true)
            })
      })

      test('The length of the permutations should be 6', () => {
            const expectedLength = 3 * 2 * 1 // Permutation of 3
            expect(permutations).toHaveLength(expectedLength)
      })

      test('All of the elements in the permutations array should have the first element as the starting point', () => {
            permutations.forEach(permutation => {
                  expect(permutation[0]).toEqual(start)
            })
      })

      test('No combination of routes should be duplicated in permutations', () => {
            const permutationsForNamesOnly = permutations.map(permutation => permutation.map(p => p.poiName).join())
            const noDuplicate = new Set(permutationsForNamesOnly)
            expect(noDuplicate.size).toBe(permutationsForNamesOnly.length)
      })
})

