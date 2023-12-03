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
    line.partNumbers.forEach((number) => {
      if (symbol.index === number.index - 1)
        confirmedPartNumbers.push(+number.value)

      const lastIndexOfNumber = number.index + number.value.length
      if (symbol.index === lastIndexOfNumber)
        confirmedPartNumbers.push(+number.value)
    })
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
    parts.forEach((part) => {
      const aboveStart = part.index - 1 <= symbol.index
      const belowEnd = part.index + part.value.length >= symbol.index
      if (aboveStart && belowEnd) confirmedPartNumbers.push(+part.value)
    })
  })
  return confirmedPartNumbers
}
