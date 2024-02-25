import { readFileSync } from 'fs'
import { day22Part1 } from './part1/part1'

const input = readFileSync(`${__dirname}/input`).toString()

const answer1 = day22Part1(input)

console.log('answer1: ', answer1)

// logically went through all the steps. However, I am not getting the right answer.
// Using help to solve.
