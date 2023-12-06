import { readFileSync } from 'fs'
import { day6Answer1 } from './part1/day6Answer1'

const input = readFileSync(`${__dirname}/input`).toString()

console.log('answer1: ', day6Answer1(input))
