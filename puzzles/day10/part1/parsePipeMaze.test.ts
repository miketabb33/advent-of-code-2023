import { describe, expect, it } from 'bun:test'
import { parsePipeMaze } from './parsePipeMaze'

describe('Parse Pipe Maze', () => {
  it('', () => {
    const input = '.....\n.F-7.\n.|.|.\n.L-J.\n.....'

    const rows = parsePipeMaze(input)
    // console.log(results)
    expect(rows.length).toEqual(5)
    expect(rows[0].index).toEqual(0)
    expect(rows[0].tiles.length).toEqual(5)

    expect(rows[0].index).toEqual(0)

    expect(rows[0].tiles[0].pipe).toEqual('.')

    expect(rows[3].tiles[2].pipe).toEqual('-')
  })
})
