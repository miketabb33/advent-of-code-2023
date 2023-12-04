import { describe, expect, it } from 'bun:test'
import {
  parseInputIntoScratchOffs,
  parseLineIntoScratchOff,
} from './parseInputIntoScratchOffs'

describe('Parse input into Scratch Offs', () => {
  it('should parse 2 lines', () => {
    const line1 = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
    const line2 = 'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19'
    const line3 = 'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1'
    const line4 = 'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83'
    const line5 = 'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36'
    const line6 = 'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'
    const result = parseInputIntoScratchOffs(
      `${line1}\n${line2}\n${line3}\n${line4}\n${line5}\n${line6}\n`
    )
    expect(result.length).toEqual(6)
    expect(result[0].worth).toEqual(8)
    expect(result[1].worth).toEqual(2)
    expect(result[2].worth).toEqual(2)
    expect(result[3].worth).toEqual(1)
    expect(result[4].worth).toEqual(0)
    expect(result[5].worth).toEqual(0)
  })
})

describe('Parse line Into Scratch Off', () => {
  it('should parse', () => {
    const line = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
    expect(parseLineIntoScratchOff(line)).toEqual({
      cardId: 1,
      winningNumbers: [41, 48, 83, 86, 17],
      existingNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
      matches: [48, 83, 86, 17],
      worth: 8,
    })
  })
})
