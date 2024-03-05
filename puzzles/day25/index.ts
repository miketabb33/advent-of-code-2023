import { readFileSync } from 'fs'
import { starter } from './part1/part1'

const input = readFileSync(`${__dirname}/input`).toString()

const answer1 = starter(input)

console.log('answer1: ', answer1)

// Skipped, its using Karger's algorithm
