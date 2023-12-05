import { readFileSync } from 'fs'
import { parseInputIntoScratchOffs } from './part1/parseInputIntoScratchOffs'
import { findScratchCopies } from './part1/findScratchCopies'

const inputBuffer = readFileSync(`${__dirname}/input`)

const answer1 = () => {
  const scratchOffs = parseInputIntoScratchOffs(inputBuffer.toString())
  const totalWorth = scratchOffs
    .map((scratch) => scratch.worth)
    .reduce((prev, current) => prev + current, 0)
  return totalWorth
}

const answer2 = () => {
  const scratchOffs = parseInputIntoScratchOffs(inputBuffer.toString())
  return findScratchCopies(scratchOffs)
}

console.log('answer1: ', answer1())

console.log('answer2: ', answer2())
