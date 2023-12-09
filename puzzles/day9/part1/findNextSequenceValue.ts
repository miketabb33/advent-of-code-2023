import { Sequence } from './types'

export const findNextSequenceValue = (sequence: Sequence): number => {
  const differences = sequence.differences

  differences.reverse()

  for (let i = 0; i < differences.length; i++) {
    const current = differences[i]
    const next = differences[i + 1]

    if (!next) continue

    const currentLast = current[current.length - 1]
    const nextLast = next[next.length - 1]

    const result = currentLast + nextLast
    if (isNaN(result)) {
      console.error('Current: ', current)
      console.error('Next: ', next)
      console.error(differences)
      throw new Error(`Not a number: ${sequence.history}`)
    }

    next.push(result)
  }

  differences.reverse()

  return differences[0][differences[0].length - 1]
}
