import { SchematicLine, SchematicResult } from '../types'

export const calculatePartNumbersInput = (lines: SchematicLine[]) => {
  const confirmedPartNumbers: number[] = []

  lines.forEach((line) => {
    const validPartNumbers = findPartNumbersForLine(line)
    validPartNumbers.forEach((validNumber) =>
      confirmedPartNumbers.push(validNumber)
    )
  })

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i]
    const nextLine = lines[i + 1]
    if (!nextLine) break

    const validParts1 = findPartNumbersForLines({
      parts: currentLine.partNumbers,
      symbols: nextLine.symbols,
    })

    const validParts2 = findPartNumbersForLines({
      parts: nextLine.partNumbers,
      symbols: currentLine.symbols,
    })

    validParts1.forEach((number) => confirmedPartNumbers.push(number))
    validParts2.forEach((number) => confirmedPartNumbers.push(number))
  }

  return confirmedPartNumbers
}

export const findPartNumbersForLine = (line: SchematicLine): number[] => {
  const confirmedPartNumbers: number[] = []

  line.symbols.forEach((symbol) => {
    const parts = findAdjacentParts(symbol, line.partNumbers)
    parts.forEach((part) => confirmedPartNumbers.push(part))
  })

  return confirmedPartNumbers
}

type FindPartNumbersForLinesArgs = {
  parts: SchematicResult[]
  symbols: SchematicResult[]
}

export const findPartNumbersForLines = ({
  parts,
  symbols,
}: FindPartNumbersForLinesArgs) => {
  const confirmedPartNumbers: number[] = []

  symbols.forEach((symbol) => {
    const partNumbers = findAdjacentParts(symbol, parts)
    partNumbers.forEach((part) => confirmedPartNumbers.push(part))
  })

  return confirmedPartNumbers
}

export const findAdjacentParts = (
  symbol: SchematicResult,
  parts: SchematicResult[]
) => {
  const confirmedPartNumbers: number[] = []
  parts.forEach((part) => {
    const aboveStart = part.index - 1 <= symbol.index
    const belowEnd = part.index + part.value.length >= symbol.index
    if (aboveStart && belowEnd) confirmedPartNumbers.push(+part.value)
  })
  return confirmedPartNumbers
}
