import { describe, expect, it } from 'bun:test'
import {
  findMirrorCandidate,
  getMirrorResult,
  rotatePattern,
  isMirrorValid,
  parseMirrorPatterns,
  day13Part2,
} from './part2'

describe('Find Mirror Candidates', () => {
  it('should return 4 for example', () => {
    const lines = [
      '#...##..#',
      '#....#..#',
      '..##..###',
      '#####.##.',
      '#####.##.',
      '..##..###',
      '#....#..#',
    ]
    expect(findMirrorCandidate(lines)).toEqual([4])
  })

  it('should return 5 for example', () => {
    const lines = [
      '#.##..##.',
      '..#.##.#.',
      '##......#',
      '##......#',
      '..#.##.#.',
      '..##..##.',
      '#.#.##.#.',
    ]
    expect(findMirrorCandidate(rotatePattern(lines))).toEqual([5])
  })

  it('should return broken', () => {
    const lines = [
      '.#..#.#',
      '#.##..#',
      '##.....',
      '....##.',
      '.....#.',
      '.....#.',
      '....##.',
      '##.....',
      '####..#',
      '.#..#.#',
      '###.##.',
      '###.##.',
      '.#..#.#',
    ]
    expect(findMirrorCandidate(lines)).toEqual([5, 11])
  })
})

describe('Rotate Pattern', () => {
  it('should rotate', () => {
    const lines = ['#.##.', '..#.#', '##...']
    const result = rotatePattern(lines)
    expect(result.length).toEqual(5)
    expect(result[0]).toEqual('#.#')
    expect(result[1]).toEqual('#..')
    expect(result[3]).toEqual('..#')
  })
})

describe('Get Mirror Result', () => {
  it('return example 1, is row reflection', () => {
    const lines = [
      '#...##..#',
      '#....#..#',
      '..##..###',
      '#####.##.',
      '#####.##.',
      '..##..###',
      '#....#..#',
    ]

    expect(getMirrorResult(lines)).toEqual({ row: 4, column: 0 })
  })

  it('return example 2, is column reflection', () => {
    const lines = [
      '#.##..##.',
      '..#.##.#.',
      '##......#',
      '##......#',
      '..#.##.#.',
      '..##..##.',
      '#.#.##.#.',
    ]

    expect(getMirrorResult(lines)).toEqual({ row: 0, column: 5 })
  })

  it('return broken', () => {
    const lines = [
      '.#..#.#',
      '#.##..#',
      '##.....',
      '....##.',
      '.....#.',
      '.....#.',
      '....##.',
      '##.....',
      '####..#',
      '.#..#.#',
      '###.##.',
      '###.##.',
      '.#..#.#',
    ]

    expect(getMirrorResult(lines)).toEqual({ row: 11, column: 0 })
  })
})

describe('validateMirror', () => {
  it('should validate example 1', () => {
    const lines = [
      '#.##..##.',
      '..#.##.#.',
      '##......#',
      '##......#',
      '..#.##.#.',
      '..##..##.',
      '#.#.##.#.',
    ]

    expect(isMirrorValid(lines, 3)).toBe(false)
  })

  it('should validate rotated example 1', () => {
    const lines = [
      '#.##..##.',
      '..#.##.#.',
      '##......#',
      '##......#',
      '..#.##.#.',
      '..##..##.',
      '#.#.##.#.',
    ]

    expect(isMirrorValid(rotatePattern(lines), 5)).toBe(true)
  })

  it('should validate example 2', () => {
    const lines = [
      '#...##..#',
      '#....#..#',
      '..##..###',
      '#####.##.',
      '#####.##.',
      '..##..###',
      '#....#..#',
    ]

    expect(isMirrorValid(lines, 4)).toBe(true)
  })
})

describe('parse mirror patterns', () => {
  it('should', () => {
    const input = '##.#..#\n###....\n\n...###.##..\n###.#...#..'
    const result = parseMirrorPatterns(input)
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual(['##.#..#', '###....'])
    expect(result[1]).toEqual(['...###.##..', '###.#...#..'])
  })
})

describe('day13Part1', () => {
  it('should resolve', () => {
    const input =
      '#.##..##.\n..#.##.#.\n##......#\n##......#\n..#.##.#.\n..##..##.\n#.#.##.#.\n\n#...##..#\n#....#..#\n..##..###\n#####.##.\n#####.##.\n..##..###\n#....#..#'

    expect(day13Part2(input)).toEqual(405)
  })
})
