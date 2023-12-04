import { readFileSync } from 'fs'
import { parseInputIntoScratchOffs } from './part1/parseInputIntoScratchOffs'

const inputBuffer = readFileSync(`${__dirname}/input`)

const answer1 = parseInputIntoScratchOffs(inputBuffer.toString())

console.log('answer1: ', answer1)
