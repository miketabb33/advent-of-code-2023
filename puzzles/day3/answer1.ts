import { calculatePartNumbersInput } from './part1/calculatePartNumbersForInput'
import { parseInputIntoSchematic } from './part1/parseInputIntoSchematic'

export const answer1 = (input: string) => {
  const schematicLines = parseInputIntoSchematic(input)
  const numbers = calculatePartNumbersInput(schematicLines)

  return numbers.reduce((acc, current) => {
    return acc + current
  }, 0)
}
