import { HaversineCalculator } from '../src/utils/HaversineCalculator'

describe('Unit Tests for HaversineCalculator.distanceBetween', () => {
      test('Should return zero for the same points', () => {
            const source = { latitude: 0, longitude: 0 }
            const destination = source
            const actual = HaversineCalculator.distanceBetween(source, destination)
            const expected = 0
            expect(actual).toBe(expected)
      })


      test('Two points in the same parallel with equal offset to the same point should be the same distant', () => {
            const
                  latitude = 0,
                  longitude = 0

            const
                  source = { latitude, longitude },
                  destinationEast = { latitude, longitude: longitude + 10 },
                  destinationWest = { latitude, longitude: longitude - 10 };

            const
                  diffEast = HaversineCalculator.distanceBetween(source, destinationEast),
                  diffWest = HaversineCalculator.distanceBetween(source, destinationWest)

            expect(diffEast).toBe(diffWest)
      })

      test('Two points in the same meridians with equal offset to the same point should be the same distant', () => {
            const
                  latitude = 0,
                  longitude = 0

            const
                  source = { latitude, longitude },
                  destinationNorth = { latitude: latitude + 10, longitude },
                  destinationSouth = { latitude: latitude - 10, longitude };

            const
                  diffNorth = HaversineCalculator.distanceBetween(source, destinationNorth),
                  diffSouth = HaversineCalculator.distanceBetween(source, destinationSouth)

            expect(diffNorth).toBe(diffSouth)
      })
})

