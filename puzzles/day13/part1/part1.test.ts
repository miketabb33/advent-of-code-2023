import { describe, expect, it } from 'bun:test'
import { findMirror, getMirrorResult, rotatePattern } from './part1'

describe('Find Along Row', () => {
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
    expect(findMirror(lines)).toEqual(4)
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

describe('Find Along Column', () => {
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
    expect(findMirror(rotatePattern(lines))).toEqual(5)
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
    // the matching row is not a reflection
    expect(getMirrorResult(lines)).toEqual({ row: 0, column: 5 })
  })
})
