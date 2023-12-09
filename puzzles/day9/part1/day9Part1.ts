import { findNextSequenceValue } from './findNextSequenceValue'
import { parseSequenceHistory } from './parseSequenceHistory'

export const day9Part1 = (input: string): number => {
  const sequences = parseSequenceHistory(input)
  const nextNumbers = sequences.map((sequence) =>
    findNextSequenceValue(sequence)
  )

  return nextNumbers.reduce((p, c) => p + c, 0)
}
