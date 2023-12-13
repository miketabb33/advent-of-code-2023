import { describe, expect, it } from 'bun:test'
import { day11Part2 } from './day11Part2'

describe('Day 11 part 2', () => {
  it('should match example', () => {
    const input =
      '...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....'
    expect(day11Part2(input)).toEqual(374)
  })
})
