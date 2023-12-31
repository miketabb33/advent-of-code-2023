import { readFileSync } from 'fs'
import { Day8Part1 } from './part1/Day8Part1'
import { Day8Part2 } from './part2/Day8Part2'

const input = readFileSync(`${__dirname}/input`).toString()

const answer1 = Day8Part1(input)

console.log('answer1: ', answer1)

console.log(
  'Day 8 | part 2 - Enter these numbers into a Least Common Multiple Tool to find answer:',
  Day8Part2(input)
)
