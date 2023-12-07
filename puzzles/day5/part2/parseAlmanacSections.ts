import { AlmanacSectionMap, AlmanacSections } from './types'

export const parseAlmanacSections = (sections: string[]): AlmanacSections => {
  const seedToSoil = parseSection(sections[0])
  const soilToFertilizer = parseSection(sections[1])
  const fertilizerToWater = parseSection(sections[2])
  const waterToLight = parseSection(sections[3])
  const lightToTemperature = parseSection(sections[4])
  const temperatureToHumidity = parseSection(sections[5])
  const humidityToLocation = parseSection(sections[6])

  return {
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

    const almanacMap: AlmanacSectionMap = {
      destinationRangeStart,
      sourceRangStart,
      rangeLength,
    }
    return almanacMap
  })
}
