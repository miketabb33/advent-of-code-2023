import { describe, expect, it } from 'bun:test'
import {
  findCorrespondingNumberFromMap,
  findCorrespondingNumberFromMaps,
  findCorrespondingNumbersForSection,
} from './mapAlmanac'
import { AlmanacMap } from './types'

describe('Find Corresponding Numbers For Sections', () => {
  it('should return target number when number is not mapped', () => {
    const result = findCorrespondingNumbersForSection(
      [79, 14, 55, 13],
      [seedToSoilA, seedToSoilB]
    )
    expect(result).toEqual([81, 14, 57, 13])
  })
})

describe('Find Corresponding Number From Maps', () => {
  it('should return target number when number is not mapped', () => {
    const result = findCorrespondingNumberFromMaps(79, [
      seedToSoilA,
      seedToSoilB,
    ])
    expect(result).toEqual(81)
  })
})

describe('Find Corresponding Number From Map', () => {
  it('should return target number when number is not mapped', () => {
    const result = findCorrespondingNumberFromMap(79, seedToSoilA)
    expect(result).toEqual(79)
  })

  it('should return corresponding number when number it can', () => {
    const result = findCorrespondingNumberFromMap(79, seedToSoilB)
    expect(result).toEqual(81)
  })
})

const seedToSoilA: AlmanacMap = {
  destinationRangeStart: 50,
  sourceRangStart: 98,
  rangeLength: 2,
}

const seedToSoilB: AlmanacMap = {
  destinationRangeStart: 52,
  sourceRangStart: 50,
  rangeLength: 48,
}
