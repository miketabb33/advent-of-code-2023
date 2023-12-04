import { calculatePartNumbersInput } from './part1/calculatePartNumbersForInput'
import { parseInputIntoSchematic } from './part1/parseInputIntoSchematic'
import { calculateGears } from './part2/calculateGears'

export const answer1 = (input: string) => {
  const schematicLines = parseInputIntoSchematic(input)
  const numbers = calculatePartNumbersInput(schematicLines)

  return numbers.reduce((acc, current) => {
    return acc + current
  }, 0)
}

export const answer2 = (input: string) => {
  const schematicLines = parseInputIntoSchematic(input)
  const gearMatches = calculateGears(schematicLines)

  const pairs = gearMatches.filter((match) => match.parts.length === 2)

  let sum = 0

  pairs.forEach((pair) => {
    const multi = pair.parts[0] * pair.parts[1]
    sum += multi
  })
  return sum
}
