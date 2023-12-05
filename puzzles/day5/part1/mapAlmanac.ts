import { Almanac, AlmanacMap } from '../types'

export const mapAlmanac = (almanac: Almanac) => {
  const soilToSeedResults = findCorrespondingNumbersForSection(
    almanac.seeds,
    almanac.seedToSoil
  )
  const soilToFertilizerResults = findCorrespondingNumbersForSection(
    soilToSeedResults,
    almanac.soilToFertilizer
  )
  const fertilizerToWaterResults = findCorrespondingNumbersForSection(
    soilToFertilizerResults,
    almanac.fertilizerToWater
  )
  const waterToLightResults = findCorrespondingNumbersForSection(
    fertilizerToWaterResults,
    almanac.waterToLight
  )
  const lightToTemperatureResults = findCorrespondingNumbersForSection(
    waterToLightResults,
    almanac.lightToTemperature
  )
  const temperatureToHumidityResults = findCorrespondingNumbersForSection(
    lightToTemperatureResults,
    almanac.temperatureToHumidity
  )
  const humidityToLocationResults = findCorrespondingNumbersForSection(
    temperatureToHumidityResults,
    almanac.humidityToLocation
  )

  return humidityToLocationResults
}

export const findCorrespondingNumbersForSection = (
  targets: number[],
  mapper: AlmanacMap[]
) => {
  return targets.map((target) =>
    findCorrespondingNumberFromMaps(target, mapper)
  )
}

export const findCorrespondingNumberFromMaps = (
  target: number,
  mapper: AlmanacMap[]
) => {
  let results: number[] = []

  mapper.forEach((map) => {
    const result = findCorrespondingNumberFromMap(target, map)
    if (result !== target) results.push(result)
  })

  return results.length === 0 ? target : results[0]
}

export const findCorrespondingNumberFromMap = (
  target: number,
  mapper: AlmanacMap
): number => {
  const sourceStart = mapper.sourceRangStart
  const sourceEnd = mapper.sourceRangStart + mapper.rangeLength

  if (target >= sourceStart && target < sourceEnd) {
    const diff = mapper.destinationRangeStart - mapper.sourceRangStart
    return target + diff
  }
  return target
}
