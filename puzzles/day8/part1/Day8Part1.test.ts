import { describe, expect, it } from 'bun:test'
import { Day8Part1 } from './Day8Part1'

describe('Day 8 Part 1', () => {
  it('should', () => {
    const input =
      'RL\n\nAAA = (BBB, CCC)\nBBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)'
    Day8Part1(input)
  })
})
