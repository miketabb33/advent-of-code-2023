import { describe, expect, it } from 'bun:test'
import { day7Part2 } from './day7Part2'

describe('Day 7 part 2', () => {
  it('should return empty when given empty', () => {
    const input = '32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483'
    expect(day7Part2(input)).toEqual(5905)
  })
})
