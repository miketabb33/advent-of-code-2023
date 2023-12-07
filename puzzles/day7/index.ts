import { readFileSync } from 'fs'
import { parseCamelHand } from './part1/parseCamelHand'

const input = readFileSync(`${__dirname}/input`).toString()

const answer1 = parseCamelHand(input)

console.log('answer1: ', answer1)
