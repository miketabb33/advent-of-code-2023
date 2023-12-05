import { mapAlmanac } from './mapAlmanac'
import { parseAlmanacInput } from './parseAlmanacInput'

export const answer1Day5 = (input: string) => {
  const result = parseAlmanacInput(input)
  return mapAlmanac(result)
}
