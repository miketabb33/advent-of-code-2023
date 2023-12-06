import { describe, expect, it } from 'bun:test'
import { day6Answer2 } from './day6Answer2'

describe('Answer2 Day6', () => {
  it('should get multiple', () => {
    const input = `Time:      7  15   30\nDistance:  9  40  200`
    const result = day6Answer2(input)
    expect(result).toEqual(71503)
  })
})
