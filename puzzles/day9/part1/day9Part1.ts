import { parseSequenceHistory } from './parseSequenceHistory'

export const day9Part1 = (input: string): number => {
  const lines = input.split('\n').filter((x) => !!x)
  const nextNumbers = lines.map((line) => parseSequenceHistory(line))
  return nextNumbers.reduce((p, c) => p + c, 0)
}

// export function predictBackwards(str: string): number {
//   return predict(str.split(' ').reverse().join(' '))
// }

// export function getExtrapolatedSum(input: string, backwards = false): number {
//   return input
//     .split('\n')
//     .map(backwards ? predictBackwards : predict)
//     .reduce((a, b) => a + b)
// }
