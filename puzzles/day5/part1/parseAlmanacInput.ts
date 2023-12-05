import { Almanac, AlmanacMap } from '../types'

export const parseAlmanacInput = (input: string): Almanac => {
  const allSections = input.split('\n\n')
  const seedSection = allSections[0]
  const restOfSections = allSections.slice(1)

  const seeds = parseSeedSection(seedSection)

  const seedToSoil = parseSection(restOfSections[0])
  const soilToFertilizer = parseSection(restOfSections[1])
  const fertilizerToWater = parseSection(restOfSections[2])
  const waterToLight = parseSection(restOfSections[3])
  const lightToTemperature = parseSection(restOfSections[4])
  const temperatureToHumidity = parseSection(restOfSections[5])
  const humidityToLocation = parseSection(restOfSections[6])

  return {
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  }
}

const parseSection = (section: string) => {
  const lines = section.split('\n').slice(1)

  return lines.map((line) => {
    const item = line.split(' ')

    const destinationRangeStart = +item[0]
    const sourceRangStart = +item[1]
    const rangeLength = +item[2]

    const almanacMap: AlmanacMap = {
      destinationRangeStart,
      sourceRangStart,
      rangeLength,
    }
    return almanacMap
  })
}

const parseSeedSection = (seedSection: string) => {
  return seedSection
    .replace('seeds: ', '')
    .split(' ')
    .map((seed) => +seed)
}
