import { readFileSync } from 'fs'
import { starter } from './part1/parseInputIntoSchematic'

const inputBuffer = readFileSync(`${__dirname}/input`)

const answer1 = starter(inputBuffer.toString())

console.log('answer1: ', answer1)
