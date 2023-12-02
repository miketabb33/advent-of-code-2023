import { getCombinedNumber1 } from './getCombinedNumber'

export const TrebuchetPart1 = (input: string): number => {
  const lines = input.split('\n')

  let sum = 0

  lines.forEach((line) => {
    sum += getCombinedNumber1(line)
  })

  return sum
}
