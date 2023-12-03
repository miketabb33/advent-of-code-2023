import { readFileSync } from 'fs'
import { answer1 } from './answer1'

const inputBuffer = readFileSync(`${__dirname}/input`)

console.log('answer1: ', answer1(inputBuffer.toString()))
