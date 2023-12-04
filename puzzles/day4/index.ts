import { readFileSync } from 'fs'
import { parseInputIntoScratchOffs } from './part1/parseInputIntoScratchOffs'

const inputBuffer = readFileSync(`${__dirname}/input`)

const answer1 = () => {
  const scratchOffs = parseInputIntoScratchOffs(inputBuffer.toString())
  const totalWorth = scratchOffs
    .map((scratch) => scratch.worth)
    .reduce((prev, current) => prev + current, 0)
  return totalWorth
}

console.log('answer1: ', answer1())
