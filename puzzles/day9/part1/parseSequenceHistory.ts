import { Sequence } from './types'

export const parseSequenceHistory = (input: string) => {
  const lines = input
    .trim()
    .split('\n')
    .filter((x) => !!x)

  return lines.map((line) => {
    const history = line
      .trim()
      .split(' ')
      .map((x) => {
        if (isNaN(+x)) {
          throw new Error(`line contains - Not a number: ${line}`)
        }
        return +x
      })

    const sequence: Sequence = {
      history,
      differences: calculateDifferences(history),
    }
    return sequence
  })
}

const calculateDifferences = (history: number[]): number[][] => {
  const diff: number[][] = [history]

  let i = 0
  while (!allZeros(diff[i])) {
    diff.push(getDifferenceRow(diff[i]))
    i++
  }

  return diff
}

const getDifferenceRow = (sequence: number[]) => {
  const cache: number[] = []

  for (let i = 0; i < sequence.length; i++) {
    const current = sequence[i]
    const next = sequence[i + 1]

    if (next) {
      const result = next - current
      if (isNaN(result))
        throw new Error(`Not a number: ${JSON.stringify(sequence)}`)
      cache.push(result)
    }
  }

  return cache
}

export const allZeros = (arr: number[]): boolean => arr.every((x) => x === 0)
