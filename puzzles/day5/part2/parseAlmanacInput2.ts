import { Almanac, AlmanacMap } from '../types'

export const parseAlmanacInput2 = (input: string): Almanac => {
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
  const seeds = seedSection
    .replace('seeds: ', '')
    .split(' ')
    .map((seed) => +seed)

  const arrays: number[] = []

  for (let i = 0; i <= seeds.length / 2; i += 2) {
    const start = seeds[i]
    const length = seeds[i + 1]

    const arr: number[] = []
    for (let j = start; j < length + start; j++) {
      arr.push(j)
    }
    arrays.push(...arr)
  }

  return arrays
}
