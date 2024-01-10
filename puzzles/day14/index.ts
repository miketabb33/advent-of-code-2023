import { readFileSync } from 'fs'
import { day14Part1 } from './part1/part1'
import { day14Part2 } from './part2/part2'

const input = readFileSync(`${__dirname}/input`).toString()

const answer1 = day14Part1(input)

console.log('answer1: ', answer1)
console.log('answer2: ', day14Part2(input))
