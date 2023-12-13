import { readFileSync } from 'fs'
import { parseIntoMatrix } from './part1/expandGalaxies'

const input = readFileSync(`${__dirname}/input`).toString()

const answer1 = parseIntoMatrix(input)

console.log('answer1: ', answer1)
