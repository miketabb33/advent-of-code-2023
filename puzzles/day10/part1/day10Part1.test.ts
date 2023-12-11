import { describe, expect, it } from 'bun:test'
import { day10Part1, findSTile } from './day10Part1'
import { parsePipeMaze } from './parsePipeMaze'

describe('FindSTile', () => {
  it('should find S and position', () => {
    const input = '.....\n.S-7.\n.|.|.\n.L-J.\n.....'
    const maze = parsePipeMaze(input)
    const sTile = findSTile(maze)
    expect(sTile.position.rowIndex).toEqual(1)
    expect(sTile.position.tileIndex).toEqual(1)
    expect(sTile.tile.pipe).toEqual('S')
  })
})

describe('Day 10 part 1', () => {
  it('should find halfway mark for example 1', () => {
    const input = '.....\n.S-7.\n.|.|.\n.L-J.\n.....'
    expect(day10Part1(input)).toEqual(4)
  })

  it('should find halfway mark for example 2', () => {
    const input = '..F7.\n.FJ|.\nSJ.L7\n|F--J\nLJ...'
    expect(day10Part1(input)).toEqual(8)
  })
})
