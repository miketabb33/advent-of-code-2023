import { readFileSync } from 'fs'
import { answer1Day5 } from './part1/answer1'
import { day5Answer2Async } from './part2/day5answer2Async'
import { day5Answer2Sync } from './part2/day5answer2Sync'

console.log('Running day 5 puzzle takes 20-50 min')

const input = readFileSync(`${__dirname}/input`).toString()
// console.log('answer1: ', answer1Day5(input).sort((a, b) => a - b)[0])

const day5Results = await day5Answer2Async(input)

console.log('answer2Async: ', day5Results)
console.log('answer2Sync: ', day5Answer2Sync(input))
