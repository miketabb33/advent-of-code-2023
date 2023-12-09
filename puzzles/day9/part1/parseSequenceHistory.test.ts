import { describe, expect, it } from 'bun:test'
import { parseSequenceHistory } from './parseSequenceHistory'

describe('Parse Sequence History', () => {
  it('should parse lines for example 1', () => {
    const results = parseSequenceHistory('0 3 6 9 12 15')
    expect(results).toEqual(18)
  })
  it('should parse lines for example 2', () => {
    const results = parseSequenceHistory('1 3 6 10 15 21')
    expect(results).toEqual(28)
  })
})
