import { describe, expect, it } from 'bun:test'
import { day11Part1 } from './day11Part1'

describe('Day 11 part 1', () => {
  it('should match example', () => {
    const input =
      '...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....'
    expect(day11Part1(input)).toEqual(374)
  })
})
