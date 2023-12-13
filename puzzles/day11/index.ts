import { readFileSync } from 'fs'
import { day11Part1 } from './part1/day11Part1'
import { day11Part2 } from './part2/day11Part2'

const input = readFileSync(`${__dirname}/input`).toString()

console.log('answer1: ', day11Part1(input))

console.log('answer2: ', day11Part2(input))
