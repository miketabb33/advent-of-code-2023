import { describe, expect, it } from 'bun:test'
import { parseAlmanacInput2 } from './parseAlmanacInput2'
import { readFileSync } from 'fs'

describe('Parse Almanac Input', () => {
  const exampleInput = readFileSync(`${__dirname}/../exampleInput`).toString()
  it('it should parse', () => {
    const result = parseAlmanacInput2(exampleInput)

    expect(result.seeds).toEqual([
      79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 55, 56, 57, 58,
      59, 60, 61, 62, 63, 64, 65, 66, 67,
    ])
    expect(result.seedToSoil.length).toEqual(2)

    expect(result.seedToSoil[0].destinationRangeStart).toEqual(50)
    expect(result.seedToSoil[0].sourceRangStart).toEqual(98)
    expect(result.seedToSoil[0].rangeLength).toEqual(2)

    expect(result.seedToSoil[1].destinationRangeStart).toEqual(52)
    expect(result.seedToSoil[1].sourceRangStart).toEqual(50)
    expect(result.seedToSoil[1].rangeLength).toEqual(48)

    expect(result.soilToFertilizer.length).toEqual(3)
    expect(result.fertilizerToWater.length).toEqual(4)
    expect(result.waterToLight.length).toEqual(2)
    expect(result.lightToTemperature.length).toEqual(3)
    expect(result.temperatureToHumidity.length).toEqual(2)
    expect(result.humidityToLocation.length).toEqual(2)
  })
})
