import { describe, expect, it } from 'bun:test'
import { parseSeedSection } from './parseSeedSection'

describe('Parse Seed Section', () => {
  it('should parse example', () => {
    const input = 'seeds: 79 14 55 13'
    expect(parseSeedSection(input)).toEqual([
      { start: 79, length: 14 },
      { start: 55, length: 13 },
    ])
  })

  it('should parse example', () => {
    const input =
      'seeds: 364807853 408612163 302918330 20208251 1499552892 200291842 3284226943 16030044 2593569946 345762334 3692780593 17215731 1207118682 189983080 2231594291 72205975 3817565407 443061598 2313976854 203929368'
    const result = parseSeedSection(input)
    expect(result.length).toEqual(10)
    expect(result).toEqual([
      { start: 364807853, length: 408612163 },
      { start: 302918330, length: 20208251 },
      { start: 1499552892, length: 200291842 },
      { start: 3284226943, length: 16030044 },
      { start: 2593569946, length: 345762334 },
      { start: 3692780593, length: 17215731 },

      { start: 1207118682, length: 189983080 },
      { start: 2231594291, length: 72205975 },
      { start: 3817565407, length: 443061598 },
      { start: 2313976854, length: 203929368 },
    ])
  })
})
