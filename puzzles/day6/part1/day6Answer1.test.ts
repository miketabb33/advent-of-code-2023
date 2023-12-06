import { describe, expect, it } from 'bun:test'
import { day6Answer1 } from './day6Answer1'

describe('Answer1 Day6', () => {
  it('should get multiple', () => {
    const input = `Time:      7  15   30\nDistance:  9  40  200`
    const result = day6Answer1(input)
    expect(result).toEqual(288)
  })
})
