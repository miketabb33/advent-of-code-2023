import { describe, expect, it } from 'bun:test'
import { rotateClockwise } from '../../../utils'
import { calculateLoad, day14Part1, tiltLine } from './part1'

const input =
  'O....#....\nO.OO#....#\n.....##...\nOO.#O....O\n.O.....O#.\nO.#..O.#.#\n..O..#O..O\n.......O..\n#....###..\n#OO..#....'

describe('day14Part1', () => {
  it('should run example', () => {
    expect(day14Part1(input)).toEqual(136)
  })
})

describe('tilt line', () => {
  it('should do nothing', () => {
    expect(tiltLine('.....')).toEqual('.....')
    expect(tiltLine('....O')).toEqual('....O')
    expect(tiltLine('..#..')).toEqual('..#..')
    expect(tiltLine('.O#..')).toEqual('.O#..')
    expect(tiltLine('.O#.O')).toEqual('.O#.O')
    expect(tiltLine('...OO')).toEqual('...OO')
    expect(tiltLine('...O#')).toEqual('...O#')
  })

  it('should roll a single circle', () => {
    expect(tiltLine('...O.')).toEqual('....O')
    expect(tiltLine('..O..')).toEqual('....O')
    expect(tiltLine('O....')).toEqual('....O')
    expect(tiltLine('O..#.')).toEqual('..O#.')
  })

  it('should roll many circles', () => {
    expect(tiltLine('O..O.')).toEqual('...OO')
    expect(tiltLine('O.#O.')).toEqual('.O#.O')
  })
})

describe('Calculate Load', () => {
  it('should add up', () => {
    expect(calculateLoad('..O')).toEqual(3)
    expect(calculateLoad('OOO')).toEqual(6)
    expect(calculateLoad('.O#.OO#....OO')).toEqual(38)
  })
})
