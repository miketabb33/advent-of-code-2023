import { getCombinedNumber2 } from './getCombinedNumber'

export const TrebuchetPart2 = (input: string): number => {
  const lines = input.split('\n')

  let sum = 0

  lines.forEach((line) => {
    sum += getCombinedNumber2(line)
  })

  return sum
}
