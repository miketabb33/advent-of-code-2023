import { readFileSync } from 'fs'
import { answer1, answer2 } from './answers'

const inputBuffer = readFileSync(`${__dirname}/input`)

// console.log('answer1: ', answer1(inputBuffer.toString()))
console.log('answer2: ', answer2(inputBuffer.toString()))
