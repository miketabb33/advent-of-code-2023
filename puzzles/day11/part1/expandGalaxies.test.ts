import { describe, expect, it } from 'bun:test'
import { expandGalaxies, parseIntoMatrix } from './expandGalaxies'

describe('Parse into matrix', () => {
  it('', () => {
    const input =
      '...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....'
    const matrix = parseIntoMatrix(input)
    expect(matrix.length).toEqual(10)
    expect(matrix[0].length).toEqual(10)
    expect(matrix[0][0]).toEqual('.')
    expect(matrix[9][0]).toEqual('#')
  })
})
describe('Expand Galaxies', () => {
  it('expand', () => {
    const input =
      '...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....'
    const matrix = parseIntoMatrix(input)
    const results = expandGalaxies(matrix)
    expect(results.length).toEqual(12)
    expect(results[0].length).toEqual(13)

    expect(results[0][4]).toEqual('#')
    expect(results[1][9]).toEqual('#')
    expect(results[2][0]).toEqual('#')
    expect(results[5][8]).toEqual('#')
    expect(results[6][1]).toEqual('#')
    expect(results[7][12]).toEqual('#')
    expect(results[10][9]).toEqual('#')
    expect(results[11][0]).toEqual('#')
    expect(results[11][5]).toEqual('#')
  })
})
