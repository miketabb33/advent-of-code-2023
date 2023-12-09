import { describe, expect, it } from 'bun:test'
import { allZeros, parseSequenceHistory } from './parseSequenceHistory'

describe('Parse Sequence History', () => {
  it('should parse lines for example 1', () => {
    const results = parseSequenceHistory('0 3 6 9 12 15')
    expect(results.length).toEqual(1)

    expect(results[0].history).toEqual([0, 3, 6, 9, 12, 15])
    expect(results[0].differences.length).toEqual(3)
    expect(results[0].differences[1].length).toEqual(5)
    expect(results[0].differences[1]).toEqual([3, 3, 3, 3, 3])
    expect(results[0].differences[2].length).toEqual(4)
    expect(results[0].differences[2]).toEqual([0, 0, 0, 0])
  })
  it('should parse lines for example 2', () => {
    const results = parseSequenceHistory('1 3 6 10 15 21')
    expect(results.length).toEqual(1)

    expect(results[0].history).toEqual([1, 3, 6, 10, 15, 21])
    expect(results[0].differences.length).toEqual(4)
    expect(results[0].differences[1].length).toEqual(5)
    expect(results[0].differences[1]).toEqual([2, 3, 4, 5, 6])
    expect(results[0].differences[2].length).toEqual(4)
    expect(results[0].differences[2]).toEqual([1, 1, 1, 1])
    expect(results[0].differences[3].length).toEqual(3)
    expect(results[0].differences[3]).toEqual([0, 0, 0])
  })
})

describe('All Zeros', () => {
  it('should return false when items are not all zeros', () => {
    expect(allZeros([1, 0, 0, 0])).toEqual(false)
  })
  it('should return true when items are not all zeros', () => {
    expect(allZeros([0, 0, 0, 0])).toEqual(true)
  })
})
