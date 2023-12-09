import { describe, expect, it } from 'bun:test'
import { parseSequenceHistory } from './parseSequenceHistory'
import { findNextSequenceValue } from './findNextSequenceValue'

describe('Find Next Sequence value', () => {
  it('should find next item for example 1', () => {
    const sequence = parseSequenceHistory('0 3 6 9 12 15')
    expect(findNextSequenceValue(sequence[0])).toEqual(18)
  })
  it('should find next item for example 2', () => {
    const sequence = parseSequenceHistory('1 3 6 10 15 21')
    expect(findNextSequenceValue(sequence[0])).toEqual(28)
  })
  it('should find next item for example 3', () => {
    const sequence = parseSequenceHistory('10 13 16 21 30 45')
    expect(findNextSequenceValue(sequence[0])).toEqual(68)
  })
})
