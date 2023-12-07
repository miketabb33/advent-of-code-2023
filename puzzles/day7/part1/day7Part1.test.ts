import { describe, expect, it } from 'bun:test'
import { day7Part1 } from './day7Part1'

describe('Day 7 part 1', () => {
  it('should return empty when given empty', () => {
    const input = '32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483'
    expect(day7Part1(input)).toEqual(6440)
  })
})
