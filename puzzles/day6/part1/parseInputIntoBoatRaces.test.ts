import { describe, expect, it } from 'bun:test'
import { parseInputIntoBoatRaces } from './parseInputIntoBoatRaces'

describe('Parse Input Into Boat Races', () => {
  it('should return empty when given empty', () => {
    const result = parseInputIntoBoatRaces('')
    expect(result.length).toEqual(0)
  })
  it('should parse example', () => {
    const input = `Time:      7  15   30\nDistance:  9  40  200`
    const result = parseInputIntoBoatRaces(input)
    expect(result.length).toEqual(3)
    expect(result[0].milliseconds).toEqual(7)
    expect(result[0].millimeters).toEqual(9)

    expect(result[0].options.length).toEqual(8)
    expect(result[0].options).toEqual([0, 6, 10, 12, 12, 10, 6, 0])

    expect(result[0].winningOptions.length).toEqual(4)

    expect(result[1].milliseconds).toEqual(15)
    expect(result[1].millimeters).toEqual(40)

    expect(result[2].milliseconds).toEqual(30)
    expect(result[2].millimeters).toEqual(200)
  })
})
