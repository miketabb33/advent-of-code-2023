import { readFileSync } from 'fs'
import { day23Part1, day23Part2 } from './part1/part1'

const input = readFileSync(`${__dirname}/input`).toString()

const answer1 = day23Part1(input)

console.log('answer1: ', answer1)

console.log('answer2: ', day23Part2(input))
// skip part 2
