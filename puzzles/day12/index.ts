import { readFileSync } from 'fs'
import { day12Part1 } from './part1/day12part1'

const input = readFileSync(`${__dirname}/input`).toString()

console.log('answer1: ', day12Part1(input))
