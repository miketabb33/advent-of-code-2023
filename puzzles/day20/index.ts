import { readFileSync } from 'fs'
import { day20Part1 } from './part1/part1'

const input = readFileSync(`${__dirname}/input`).toString()

const answer1 = day20Part1(input)

console.log('answer1: ', answer1)
