import { describe, expect, it } from 'bun:test'
import { parsePipeMaze } from './parsePipeMaze'
import { findSTile } from './day10Part1'
import { findNextTile } from './findNextTile'

describe('FindNextTile', () => {
  it('should follow example 1', () => {
    const input = '.....\n.S-7.\n.|.|.\n.L-J.\n.....'
    const maze = parsePipeMaze(input)
    const sTile = findSTile(maze)

    const tile1 = findNextTile(sTile, maze)

    expect(tile1.position.rowIndex).toEqual(1)
    expect(tile1.position.tileIndex).toEqual(2)
    expect(tile1.tile.pipe).toEqual('-')
    expect(tile1.direction).toEqual('east')

    const tile2 = findNextTile(tile1, maze)

    expect(tile2.position.rowIndex).toEqual(1)
    expect(tile2.position.tileIndex).toEqual(3)
    expect(tile2.tile.pipe).toEqual('7')
    expect(tile2.direction).toEqual('south')

    const tile3 = findNextTile(tile2, maze)

    expect(tile3.position.rowIndex).toEqual(2)
    expect(tile3.position.tileIndex).toEqual(3)
    expect(tile3.tile.pipe).toEqual('|')
    expect(tile3.direction).toEqual('south')

    const tile4 = findNextTile(tile3, maze)

    expect(tile4.position.rowIndex).toEqual(3)
    expect(tile4.position.tileIndex).toEqual(3)
    expect(tile4.tile.pipe).toEqual('J')
    expect(tile4.direction).toEqual('west')

    const tile5 = findNextTile(tile4, maze)

    expect(tile5.position.rowIndex).toEqual(3)
    expect(tile5.position.tileIndex).toEqual(2)
    expect(tile5.tile.pipe).toEqual('-')
    expect(tile5.direction).toEqual('west')

    const tile6 = findNextTile(tile5, maze)

    expect(tile6.position.rowIndex).toEqual(3)
    expect(tile6.position.tileIndex).toEqual(1)
    expect(tile6.tile.pipe).toEqual('L')
    expect(tile6.direction).toEqual('north')

    const tile7 = findNextTile(tile6, maze)

    expect(tile7.position.rowIndex).toEqual(2)
    expect(tile7.position.tileIndex).toEqual(1)
    expect(tile7.tile.pipe).toEqual('|')
    expect(tile7.direction).toEqual('north')

    const tile8 = findNextTile(tile7, maze)

    expect(tile8.position.rowIndex).toEqual(1)
    expect(tile8.position.tileIndex).toEqual(1)
    expect(tile8.tile.pipe).toEqual('S')
    expect(tile8.direction).toEqual('north')
  })

  it('should follow example 2', () => {
    const input = '..F7.\n.FJ|.\nSJ.L7\n|F--J\nLJ...'
    const maze = parsePipeMaze(input)
    const sTile = findSTile(maze)

    const tile1 = findNextTile(sTile, maze)

    expect(tile1.position.rowIndex).toEqual(2)
    expect(tile1.position.tileIndex).toEqual(1)
    expect(tile1.tile.pipe).toEqual('J')
    expect(tile1.direction).toEqual('north')

    const tile2 = findNextTile(tile1, maze)

    expect(tile2.position.rowIndex).toEqual(1)
    expect(tile2.position.tileIndex).toEqual(1)
    expect(tile2.tile.pipe).toEqual('F')
    expect(tile2.direction).toEqual('east')

    const tile3 = findNextTile(tile2, maze)

    expect(tile3.position.rowIndex).toEqual(1)
    expect(tile3.position.tileIndex).toEqual(2)
    expect(tile3.tile.pipe).toEqual('J')
    expect(tile3.direction).toEqual('north')

    const tile4 = findNextTile(tile3, maze)

    expect(tile4.position.rowIndex).toEqual(0)
    expect(tile4.position.tileIndex).toEqual(2)
    expect(tile4.tile.pipe).toEqual('F')
    expect(tile4.direction).toEqual('east')

    const tile5 = findNextTile(tile4, maze)

    expect(tile5.position.rowIndex).toEqual(0)
    expect(tile5.position.tileIndex).toEqual(3)
    expect(tile5.tile.pipe).toEqual('7')
    expect(tile5.direction).toEqual('south')

    const tile6 = findNextTile(tile5, maze)

    expect(tile6.position.rowIndex).toEqual(1)
    expect(tile6.position.tileIndex).toEqual(3)
    expect(tile6.tile.pipe).toEqual('|')
    expect(tile6.direction).toEqual('south')

    const tile7 = findNextTile(tile6, maze)

    expect(tile7.position.rowIndex).toEqual(2)
    expect(tile7.position.tileIndex).toEqual(3)
    expect(tile7.tile.pipe).toEqual('L')
    expect(tile7.direction).toEqual('east')

    const tile8 = findNextTile(tile7, maze)

    expect(tile8.position.rowIndex).toEqual(2)
    expect(tile8.position.tileIndex).toEqual(4)
    expect(tile8.tile.pipe).toEqual('7')
    expect(tile8.direction).toEqual('south')

    const tile9 = findNextTile(tile8, maze)

    expect(tile9.position.rowIndex).toEqual(3)
    expect(tile9.position.tileIndex).toEqual(4)
    expect(tile9.tile.pipe).toEqual('J')
    expect(tile9.direction).toEqual('west')
  })
})
