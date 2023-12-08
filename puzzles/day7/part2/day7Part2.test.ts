import { describe, expect, it } from 'bun:test'
import { day7Part2 } from './day7Part2'

describe('Day 7 part 2', () => {
  it('should parse example', () => {
    const input = '32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483'
    expect(day7Part2(input)).toEqual(5905)
  })

  it('should return empty when given empty', () => {
    const input =
      '2345A 1\nQ2KJJ 13\nQ2Q2Q 19\nT3T3J 17\nT3Q33 11\n2345J 3\nJ345A 2\n32T3K 5\nT55J5 29\nKK677 7\nKTJJT 34\nQQQJA 31\nJJJJJ 37\nJAAAA 43\nAAAAJ 59\nAAAAA 61\n2AAAA 23\n2JJJJ 53\nJJJJ2 41'
    // expect(day7Part2(input)).toEqual(6839)
  })
})
