import { readFileSync } from 'fs'
import { day9Part1 } from './part1/day9Part1'

const input = readFileSync(`${__dirname}/input`).toString()

console.log('answer1: ', day9Part1(input))
