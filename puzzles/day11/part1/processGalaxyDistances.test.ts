import { describe, expect, it } from 'bun:test'
import { expandGalaxies, parseIntoMatrix } from './expandGalaxies'
import {
  GalaxyPosition,
  findGalaxies,
  findGalaxyDistance,
} from './processGalaxyDistances'

describe('Find Galaxies', () => {
  it('should find from example', () => {
    const input =
      '...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....'
    const matrix = parseIntoMatrix(input)
    const expanded = expandGalaxies(matrix)
    const results = findGalaxies(expanded)

    expect(results.length).toEqual(9)

    expect(results[0].rowIndex).toEqual(0)
    expect(results[0].columnIndex).toEqual(4)

    expect(results[1].rowIndex).toEqual(1)
    expect(results[1].columnIndex).toEqual(9)

    expect(results[2].rowIndex).toEqual(2)
    expect(results[2].columnIndex).toEqual(0)

    expect(results[3].rowIndex).toEqual(5)
    expect(results[3].columnIndex).toEqual(8)

    expect(results[4].rowIndex).toEqual(6)
    expect(results[4].columnIndex).toEqual(1)

    expect(results[5].rowIndex).toEqual(7)
    expect(results[5].columnIndex).toEqual(12)

    expect(results[6].rowIndex).toEqual(10)
    expect(results[6].columnIndex).toEqual(9)

    expect(results[7].rowIndex).toEqual(11)
    expect(results[7].columnIndex).toEqual(0)

    expect(results[8].rowIndex).toEqual(11)
    expect(results[8].columnIndex).toEqual(5)
  })
})

describe('Find Galaxy Distance', () => {
  it('should find example 5 and 9', () => {
    const a: GalaxyPosition = { rowIndex: 6, columnIndex: 1 }
    const b: GalaxyPosition = { rowIndex: 11, columnIndex: 5 }
    expect(findGalaxyDistance(a, b)).toEqual(9)
  })
  it('should find example 1 and 7', () => {
    const a: GalaxyPosition = { rowIndex: 0, columnIndex: 4 }
    const b: GalaxyPosition = { rowIndex: 10, columnIndex: 9 }
    expect(findGalaxyDistance(a, b)).toEqual(15)
  })
  it('should find example 3 and 6', () => {
    const a: GalaxyPosition = { rowIndex: 2, columnIndex: 0 }
    const b: GalaxyPosition = { rowIndex: 7, columnIndex: 12 }
    expect(findGalaxyDistance(a, b)).toEqual(17)
  })
  it('should find example 8 and 9', () => {
    const a: GalaxyPosition = { rowIndex: 11, columnIndex: 0 }
    const b: GalaxyPosition = { rowIndex: 11, columnIndex: 5 }
    expect(findGalaxyDistance(a, b)).toEqual(5)
  })
})
