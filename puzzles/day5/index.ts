import { readFileSync } from 'fs'
import { answer1Day5 } from './part1/answer1'

const input = readFileSync(`${__dirname}/input`).toString()
console.log('answer1: ', answer1Day5(input).sort((a, b) => a - b)[0])
