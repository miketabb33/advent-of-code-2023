import { readFileSync } from 'fs'
import { day10Part1 } from './part1/day10Part1'
import { day10Part2 } from './day10Part2'

const input = readFileSync(`${__dirname}/input`).toString()

console.log('answer1: ', day10Part1(input))

console.log('answer2: open day10/visualizer.html')
day10Part2(input)
