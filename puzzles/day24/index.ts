import { readFileSync } from 'fs'
import { day24Part1 } from './part1/part1'

const input = readFileSync(`${__dirname}/input`).toString()

const answer1 = day24Part1(input, 200_000_000_000_000, 400_000_000_000_000)

console.log('answer1: ', answer1)

// Completed Finding intersections. Skipped on finding future vs past intersections
