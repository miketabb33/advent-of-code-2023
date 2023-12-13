import { describe, expect, it } from 'bun:test'
import { findGalaxyDistance } from './processGalaxyDistances'
import { GalaxyPosition } from './types'
import { findGalaxies, findVoids, parseIntoMatrix } from './parseGalaxies'

const input =
  '...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....'
const matrix = parseIntoMatrix(input)
const galaxies = findGalaxies(matrix)
const voids = findVoids(matrix)

describe('Find Galaxy Distance', () => {
  it('should find example 5 and 9', () => {
    expect(findGalaxyDistance(galaxies[4], galaxies[8], voids, 1)).toEqual(9)
  })
  it('should find example 1 and 7', () => {
    expect(findGalaxyDistance(galaxies[0], galaxies[6], voids, 1)).toEqual(15)
  })
  it('should find example 3 and 6', () => {
    expect(findGalaxyDistance(galaxies[2], galaxies[5], voids, 1)).toEqual(17)
  })
  it('should find example 8 and 9', () => {
    expect(findGalaxyDistance(galaxies[7], galaxies[8], voids, 1)).toEqual(5)
  })
  it('should find example 2 and 3', () => {
    expect(findGalaxyDistance(galaxies[1], galaxies[2], voids, 1)).toEqual(10)
  })
})
