import { parseSequenceHistory } from './parseSequenceHistory'

export const day9Part1 = (input: string): number => {
  const lines = input.split('\n').filter((x) => !!x)
  const nextNumbers = lines.map((line) => parseSequenceHistory(line))
  return nextNumbers.reduce((p, c) => p + c, 0)
}

export const day9Part2 = (input: string): number => {
  const lines = input
    .split('\n')
    .reverse()
    .filter((x) => !!x)
  const nextNumbers = lines.map((line) => {
    return parseSequenceHistory(line.split(' ').reverse().join(' '))
  })
  return nextNumbers.reduce((p, c) => p + c, 0)
}
