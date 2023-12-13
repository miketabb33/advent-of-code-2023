import { readFileSync } from 'fs'
import { day11Part1 } from './part1/day11Part1'

const input = readFileSync(`${__dirname}/input`).toString()

console.log('answer1: ', day11Part1(input))
