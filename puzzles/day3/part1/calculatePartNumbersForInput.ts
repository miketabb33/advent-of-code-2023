import { SchematicLine } from '../types'

export const calculatePartNumbersInput = (lines: SchematicLine[]) => {
  const confirmedPartNumbers: number[] = []

  lines.forEach((line) => {
    const validPartNumbers = findPartNumbersForLine(line)
    validPartNumbers.forEach((validNumber) =>
      confirmedPartNumbers.push(validNumber)
    )
  })

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
