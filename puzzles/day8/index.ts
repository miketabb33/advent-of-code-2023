import { readFileSync } from 'fs'
import { Day8Part1 } from './part1/Day8Part1'

const input = readFileSync(`${__dirname}/input`).toString()

const answer1 = Day8Part1(input)

console.log('answer1: ', answer1)
