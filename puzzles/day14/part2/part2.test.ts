import { describe, expect, it } from 'bun:test'
import { calculateLoad, cyclePlatformTimes, tiltLine } from './part2'

const input =
  'O....#....\nO.OO#....#\n.....##...\nOO.#O....O\n.O.....O#.\nO.#..O.#.#\n..O..#O..O\n.......O..\n#....###..\n#OO..#....'

describe('cycle platform times', () => {
  it('should run example for 1 cycle', () => {
    const result = cyclePlatformTimes(input.split('\n'), 1)
    expect(result[0]).toEqual('.....#....')
    expect(result[1]).toEqual('....#...O#')
    expect(result[2]).toEqual('...OO##...')
    expect(result[3]).toEqual('.OO#......')
    expect(result[4]).toEqual('.....OOO#.')
    expect(result[5]).toEqual('.O#...O#.#')
    expect(result[6]).toEqual('....O#....')
    expect(result[7]).toEqual('......OOOO')
    expect(result[8]).toEqual('#...O###..')
    expect(result[9]).toEqual('#..OO#....')
  })
  it('should run example for 2 cycles', () => {
    const result = cyclePlatformTimes(input.split('\n'), 2)
    expect(result[0]).toEqual('.....#....')
    expect(result[1]).toEqual('....#...O#')
    expect(result[2]).toEqual('.....##...')
    expect(result[3]).toEqual('..O#......')
    expect(result[4]).toEqual('.....OOO#.')
    expect(result[5]).toEqual('.O#...O#.#')
    expect(result[6]).toEqual('....O#...O')
    expect(result[7]).toEqual('.......OOO')
    expect(result[8]).toEqual('#..OO###..')
    expect(result[9]).toEqual('#.OOO#...O')
  })
  it('should run example for 3 cycles', () => {
    const result = cyclePlatformTimes(input.split('\n'), 3)
    expect(result[0]).toEqual('.....#....')
    expect(result[1]).toEqual('....#...O#')
    expect(result[2]).toEqual('.....##...')
    expect(result[3]).toEqual('..O#......')
    expect(result[4]).toEqual('.....OOO#.')
    expect(result[5]).toEqual('.O#...O#.#')
    expect(result[6]).toEqual('....O#...O')
    expect(result[7]).toEqual('.......OOO')
    expect(result[8]).toEqual('#...O###.O')
    expect(result[9]).toEqual('#.OOO#...O')
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
