import { describe, expect, it } from 'bun:test'
import { parseAlmanacInput } from './parseAlmanacInput'
import { readFileSync } from 'fs'

describe('Parse Almanac Input', () => {
  const exampleInput = readFileSync(`${__dirname}/../exampleInput`).toString()
  it('it should parse', () => {
    const result = parseAlmanacInput(exampleInput)
    expect(result.seeds).toEqual([79, 14, 55, 13])
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
