import { readFileSync } from 'fs'
import { parseInputIntoBoatRaces } from './part1/parseInputIntoBoatRaces'

const input = readFileSync(`${__dirname}/input`).toString()

const answer1 = parseInputIntoBoatRaces(input)

console.log('answer1: ', answer1)
