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
    expect(findMirrorCandidate(lines)).toEqual([
      { index: 1, smudgeInFirstRow: true },
      { index: 4, smudgeInFirstRow: false },
    ])
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
    expect(findMirrorCandidate(rotatePattern(lines))).toEqual([
      { index: 5, smudgeInFirstRow: false },
    ])
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
    expect(findMirrorCandidate(lines)).toEqual([
      { index: 4, smudgeInFirstRow: true },
      { index: 5, smudgeInFirstRow: false },
      { index: 6, smudgeInFirstRow: true },
      { index: 11, smudgeInFirstRow: false },
    ])
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

    expect(getMirrorResult(lines)).toEqual({ row: 1, column: 0 })
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

    expect(getMirrorResult(lines)).toEqual({ row: 3, column: 0 })
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

    expect(getMirrorResult(lines)).toEqual({ row: 5, column: 0 })
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

describe('day13Part2', () => {
  it('should resolve', () => {
    const input =
      '#.##..##.\n..#.##.#.\n##......#\n##......#\n..#.##.#.\n..##..##.\n#.#.##.#.\n\n#...##..#\n#....#..#\n..##..###\n#####.##.\n#####.##.\n..##..###\n#....#..#'

    expect(day13Part2(input)).toEqual(400)
  })
})
