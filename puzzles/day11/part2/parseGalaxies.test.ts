import { describe, expect, it } from 'bun:test'
import { findGalaxies, findVoids, parseIntoMatrix } from './parseGalaxies'

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

describe('Find Galaxies', () => {
  it('should find from example', () => {
    const input =
      '...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....'
    const matrix = parseIntoMatrix(input)

    const results = findGalaxies(matrix)

    expect(results.length).toEqual(9)

    expect(results[0].rowIndex).toEqual(0)
    expect(results[0].columnIndex).toEqual(3)

    expect(results[1].rowIndex).toEqual(1)
    expect(results[1].columnIndex).toEqual(7)

    expect(results[2].rowIndex).toEqual(2)
    expect(results[2].columnIndex).toEqual(0)

    expect(results[3].rowIndex).toEqual(4)
    expect(results[3].columnIndex).toEqual(6)

    expect(results[4].rowIndex).toEqual(5)
    expect(results[4].columnIndex).toEqual(1)

    expect(results[5].rowIndex).toEqual(6)
    expect(results[5].columnIndex).toEqual(9)

    expect(results[6].rowIndex).toEqual(8)
    expect(results[6].columnIndex).toEqual(7)

    expect(results[7].rowIndex).toEqual(9)
    expect(results[7].columnIndex).toEqual(0)

    expect(results[8].rowIndex).toEqual(9)
    expect(results[8].columnIndex).toEqual(4)
  })
})

describe('Find Voids', () => {
  it('should find void columns', () => {
    const input =
      '...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....'
    const matrix = parseIntoMatrix(input)

    const results = findVoids(matrix)

    expect(results.columnIndexes).toEqual([2, 5, 8])
    expect(results.rowIndexes).toEqual([3, 7])
  })
})
