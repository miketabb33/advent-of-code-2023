import { AlmanacSectionMap, AlmanacSections } from './types'

export const seedMapper = (seed: number, almanac: AlmanacSections) => {
  const soilToSeedResults = findCorrespondingNumberFromMaps(
    seed,
    almanac.seedToSoil
  )
  const soilToFertilizerResults = findCorrespondingNumberFromMaps(
    soilToSeedResults,
    almanac.soilToFertilizer
  )
  const fertilizerToWaterResults = findCorrespondingNumberFromMaps(
    soilToFertilizerResults,
    almanac.fertilizerToWater
  )
  const waterToLightResults = findCorrespondingNumberFromMaps(
    fertilizerToWaterResults,
    almanac.waterToLight
  )
  const lightToTemperatureResults = findCorrespondingNumberFromMaps(
    waterToLightResults,
    almanac.lightToTemperature
  )
  const temperatureToHumidityResults = findCorrespondingNumberFromMaps(
    lightToTemperatureResults,
    almanac.temperatureToHumidity
  )
  const humidityToLocationResults = findCorrespondingNumberFromMaps(
    temperatureToHumidityResults,
    almanac.humidityToLocation
  )

  return humidityToLocationResults
}

const findCorrespondingNumberFromMaps = (
  target: number,
  mapper: AlmanacSectionMap[]
) => {
  let results: number[] = []

  mapper.forEach((map) => {
    const result = findCorrespondingNumberFromMap(target, map)
    if (result !== target) results.push(result)
  })

  return results.length === 0 ? target : results[0]
}

const findCorrespondingNumberFromMap = (
  target: number,
  mapper: AlmanacSectionMap
): number => {
  const sourceStart = mapper.sourceRangStart
  const sourceEnd = mapper.sourceRangStart + mapper.rangeLength

  if (target >= sourceStart && target < sourceEnd) {
    const diff = mapper.destinationRangeStart - mapper.sourceRangStart
    return target + diff
  }

  return target
}
