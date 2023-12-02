import { readFileSync } from 'fs'
import { TrebuchetPart1 } from './part1/TrebuchetPart1'
import { TrebuchetPart2 } from './part2/TrebuchetPart2'

const inputBuffer = readFileSync(`${__dirname}/input`)

const answer1 = TrebuchetPart1(inputBuffer.toString())
const answer2 = TrebuchetPart2(inputBuffer.toString())

console.log('answer1: ', answer1)
console.log('answer2: ', answer2)
