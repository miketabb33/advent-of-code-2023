import { readFileSync } from 'fs'
import { parseInputIntoSchematic } from './part1/parseInputIntoSchematic'
import { answer1 } from './answer1'

const inputBuffer = readFileSync(`${__dirname}/input`)

console.log('answer1: ', answer1(inputBuffer.toString()))
