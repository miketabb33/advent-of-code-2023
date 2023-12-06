import { readFileSync } from 'fs'
import { day6Answer1 } from './part1/day6Answer1'
import { day6Answer2 } from './part2/day6Answer2'

const input = readFileSync(`${__dirname}/input`).toString()

console.log('answer1: ', day6Answer1(input))

console.log('answer2: ', day6Answer2(input))
