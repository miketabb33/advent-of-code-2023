import { readFileSync } from 'fs'
import { day7Part1 } from './part1/day7Part1'
import { day7Part2 } from './part2/day7Part2'

const input = readFileSync(`${__dirname}/input`).toString()

console.log('answer1: ', day7Part1(input))

console.log('answer2: ', day7Part2(input))
