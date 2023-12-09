import { readFileSync } from 'fs'
import { day9Part1, day9Part2 } from './part1/day9'

const input = readFileSync(`${__dirname}/input`).toString()

console.log('answer1: ', day9Part1(input))

console.log('answer2: ', day9Part2(input))
