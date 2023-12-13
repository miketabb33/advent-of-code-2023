import { findGalaxies, findVoids, parseIntoMatrix } from './parseGalaxies'
import { processGalaxyDistances } from './processGalaxyDistances'

export const day11Part2 = (input: string, expansionAmount: number): number => {
  const matrix = parseIntoMatrix(input)
  const galaxies = findGalaxies(matrix)
  const voids = findVoids(matrix)

  return processGalaxyDistances(galaxies, voids, expansionAmount)
}
