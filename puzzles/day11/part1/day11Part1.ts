import { expandGalaxies, parseIntoMatrix } from './expandGalaxies'
import { processGalaxyDistances } from './processGalaxyDistances'

export const day11Part1 = (input: string): number => {
  const matrix = parseIntoMatrix(input)
  const expanded = expandGalaxies(matrix)
  return processGalaxyDistances(expanded)
}
