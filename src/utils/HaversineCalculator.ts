import { decimalDegreesToRadians } from './decimalDegreesToRadians'
import type { Point } from '../typings'

export class HaversineCalculator {
      static earthRadiusInKm = 6371e3

      private static haversineFormula(x: number) {
            return Math.pow(Math.sin(x / 2), 2)
      }

      /**
       * Calculates the distance between two coordinates in radians useing Haversine's Formula
       */
      static distanceBetween(source: Point, destination: Point): number {
            const sourceLat = decimalDegreesToRadians(source.latitude)
            const sourceLng = decimalDegreesToRadians(source.longitude)

            const destLat = decimalDegreesToRadians(destination.latitude)
            const destLng = decimalDegreesToRadians(destination.longitude)

            const deltaLat = destLat - sourceLat
            const deltaLng = destLng - sourceLng

            const ht = HaversineCalculator.haversineFormula(deltaLat) + Math.cos(sourceLat) * Math.cos(destLat) * HaversineCalculator.haversineFormula(deltaLng)
            return Math.trunc(2 * HaversineCalculator.earthRadiusInKm * Math.asin(Math.sqrt(ht)))
      }
}