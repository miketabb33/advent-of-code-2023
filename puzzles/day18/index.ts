import { readFileSync } from 'fs'
import { day18Part1 } from './part1/day18Part1'

const input = readFileSync(`${__dirname}/input`).toString()

const answer1 = day18Part1(input)

console.log('answer1: ', answer1)
