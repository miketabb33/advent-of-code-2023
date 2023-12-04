import { describe, expect, it } from 'bun:test'
import {
  parseInputIntoScratchOffs,
  parseLineIntoScratchOff,
} from './parseInputIntoScratchOffs'

describe('Parse input into Scratch Offs', () => {
  it('should parse 2 lines', () => {
    const line1 = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
    const line2 = 'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19'
    expect(parseInputIntoScratchOffs(`${line1}\n${line2}`).length).toEqual(2)
  })
})

describe('Parse line Into Scratch Off', () => {
  it('should parse', () => {
    const line = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
    expect(parseLineIntoScratchOff(line)).toEqual({
      cardId: 1,
      winningNumbers: [41, 48, 83, 86, 17],
      existingNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
    })
  })
})
