export type AlmanacSections = {
  seedToSoil: AlmanacSectionMap[]
  soilToFertilizer: AlmanacSectionMap[]
  fertilizerToWater: AlmanacSectionMap[]
  waterToLight: AlmanacSectionMap[]
  lightToTemperature: AlmanacSectionMap[]
  temperatureToHumidity: AlmanacSectionMap[]
  humidityToLocation: AlmanacSectionMap[]
}

export type AlmanacSectionMap = {
  destinationRangeStart: number
  sourceRangStart: number
  rangeLength: number
}

export type AlmanacSeed = {
  start: number
  length: number
}
