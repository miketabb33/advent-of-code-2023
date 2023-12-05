import { readFileSync } from 'fs'
import { parseAlmanacInput } from './part1/parseAlmanacInput'

const input = readFileSync(`${__dirname}/input`).toString()
const exampleInput = readFileSync(`${__dirname}/exampleInput`).toString()

const exampleAnswer = parseAlmanacInput(exampleInput)

// const answer1 = parseAlmanacInput(input)

console.log('example answer: ', exampleAnswer)
// console.log('answer1: ', answer1)
