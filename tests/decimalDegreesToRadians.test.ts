import { decimalDegreesToRadians } from '../src/utils/decimalDegreesToRadians'

describe('Test Case for decimalDegreesToRadians function', () => {
      test('Positive decimal degrees should result in positive radians', () => {
            const degree = 1
            const radians = decimalDegreesToRadians(degree)
            expect(radians).toBeGreaterThan(0)
      })

      test('Negative decimal degrees should result in positive radians', () => {
            const degree = -1
            const radians = decimalDegreesToRadians(degree)
            expect(radians).toBeLessThan(0)
      })

      test('Zero decimal degrees should result in zero radians', () => {
            const degree = 0
            const radians = decimalDegreesToRadians(degree)
            expect(radians).toBe(0)
      })

      test('Opposite signs of the same degree should result in the same radians with opposite sign', () => {
            const degree = 15.1

            const
                  positiveDegree = degree,
                  negativeDegree = -degree

            const
                  positiveRadians = decimalDegreesToRadians(positiveDegree),
                  negativeRadians = decimalDegreesToRadians(negativeDegree)

            expect(positiveRadians).toBe(Math.abs(negativeRadians))
      })
})
