import { describe, expect, it } from 'bun:test'
import { rotateClockwise } from '../../../utils'
import { tiltLine } from './part1'

const input =
  'O....#....\nO.OO#....#\n.....##...\nOO.#O....O\n.O.....O#.\nO.#..O.#.#\n..O..#O..O\n.......O..\n#....###..\n#OO..#....'

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

  it('should roll the circle', () => {
    expect(tiltLine('...O.')).toEqual('....O')
    expect(tiltLine('..O..')).toEqual('....O')
    expect(tiltLine('O....')).toEqual('....O')
    expect(tiltLine('O..#.')).toEqual('..O#.')
  })
})
