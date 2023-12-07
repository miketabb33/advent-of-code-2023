import { readFileSync } from 'fs'
import { day7Part1 } from './part1/day7Part1'

const input = readFileSync(`${__dirname}/input`).toString()

console.log('answer1: ', day7Part1(input))
