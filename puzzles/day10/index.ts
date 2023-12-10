import { readFileSync } from 'fs'
import { parsePipeMaze } from './part1/parsePipeMaze'
import { day10Part1 } from './part1/day10Part1'

const input = readFileSync(`${__dirname}/input`).toString()

console.log('answer1: ', day10Part1(input))
