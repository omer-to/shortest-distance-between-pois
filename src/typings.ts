export interface Point {
      /**
       * In Decimal Degrees
       * Must be between -90 and 90, both inclusive
       */
      latitude: number

      /**
       * In Decimal Degrees
       * Must be between -180, and 180, both inclusive
       */
      longitude: number
}

export interface Poi extends Point { // or type Poi = { poiName: string } & Point
      poiName: string
}