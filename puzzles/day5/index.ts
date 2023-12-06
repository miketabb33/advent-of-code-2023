import { readFileSync } from 'fs'
import { answer1Day5 } from './part1/answer1'
import { parseAlmanacInput2 } from './part2/parseAlmanacInput2'
import { mapAlmanac } from './part1/mapAlmanac'

const input = readFileSync(`${__dirname}/input`).toString()
// console.log('answer1: ', answer1Day5(input).sort((a, b) => a - b)[0])

const answer2 = () => {
  const almanac = parseAlmanacInput2(input)
  return mapAlmanac(almanac)
}

console.log('answer2: ', answer2().sort((a, b) => a - b)[0])
