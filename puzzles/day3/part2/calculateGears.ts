import { findAdjacentParts } from '../part1/calculatePartNumbersForInput'
import { SchematicLine, SchematicResult } from '../types'

export type GearMatch = {
  symbol: string
  parts: number[]
}

const emptyLine = (): SchematicLine => ({
  symbols: [],
  partNumbers: [],
})

export const calculateGears = (lines: SchematicLine[]): GearMatch[] => {
  const gearMatches: GearMatch[] = []
  for (let i = 0; i < lines.length; i++) {
    const firstLine = lines[i] || emptyLine()
    const secondLine = lines[i + 1] || emptyLine()
    const thirdLine = lines[i + 2] || emptyLine()

    const results = findGearMatches(
      firstLine.partNumbers,
      secondLine,
      thirdLine.partNumbers
    )
    results.forEach((result) => gearMatches.push(result))
  }

  return gearMatches
}

export const findGearMatches = (
  aboveParts: SchematicResult[],
  targetLine: SchematicLine,
  belowParts: SchematicResult[]
): GearMatch[] => {
  const gearMatches: GearMatch[] = []

  targetLine.symbols.forEach((symbol, i) => {
    const aboveMatches = findAdjacentParts(symbol, aboveParts)
    const sameLineMatches = findAdjacentParts(symbol, targetLine.partNumbers)
    const belowMatches = findAdjacentParts(symbol, belowParts)
    gearMatches.push({
      symbol: symbol.value,
      parts: [...aboveMatches, ...sameLineMatches, ...belowMatches],
    })
  })

  return gearMatches
}
