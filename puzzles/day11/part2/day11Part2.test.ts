import { describe, expect, it } from 'bun:test'
import { day11Part2 } from './day11Part2'
const input =
  '...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....'
describe('Day 11 part 2', () => {
  it('should match example', () => {
    expect(day11Part2(input, 1)).toEqual(374)
    expect(day11Part2(input, 9)).toEqual(1030)
    expect(day11Part2(input, 99)).toEqual(8410)
  })
})
