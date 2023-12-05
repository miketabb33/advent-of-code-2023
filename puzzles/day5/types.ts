export type Almanac = {
  seeds: number[]
  seedToSoil: AlmanacMap[]
  soilToFertilizer: AlmanacMap[]
  fertilizerToWater: AlmanacMap[]
  waterToLight: AlmanacMap[]
  lightToTemperature: AlmanacMap[]
  temperatureToHumidity: AlmanacMap[]
  humidityToLocation: AlmanacMap[]
}

export type AlmanacMap = {
  destinationRangeStart: number
  sourceRangStart: number
  rangeLength: number
}
