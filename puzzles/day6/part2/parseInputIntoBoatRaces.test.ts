import { describe, expect, it } from 'bun:test'
import { parseInputIntoBoatRaces } from './parseInputIntoBoatRaces'

describe('Parse Input Into Boat Races', () => {
  it('should parse example', () => {
    const input = `Time:      7  15   30\nDistance:  9  40  200`
    const result = parseInputIntoBoatRaces(input)
    expect(result.milliseconds).toEqual(71530)
    expect(result.millimeters).toEqual(940200)
    expect(result.options.length).toEqual(71531)
    expect(result.winningOptions.length).toEqual(71503)
  })
})
