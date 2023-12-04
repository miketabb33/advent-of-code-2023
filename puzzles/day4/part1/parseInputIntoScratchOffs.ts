import { ScratchOff } from '../type'

export const parseInputIntoScratchOffs = (input: string): ScratchOff[] => {
  const lines = input.split('\n').filter((line) => line !== '')
  return lines.map(parseLineIntoScratchOff)
}

export const parseLineIntoScratchOff = (line: string): ScratchOff => {
  const titleAndNumbers = line.split(':')
  const title = titleAndNumbers[0]
  const numbers = titleAndNumbers[1]

  const cardId = title.replace('Card', '').trim()

  const winningAndExisting = numbers.split('|')

  const winningNumbers: number[] = convertToArrOfNumbers(winningAndExisting[0])
  const existingNumbers: number[] = convertToArrOfNumbers(winningAndExisting[1])
  const matches = findMatches(winningNumbers, existingNumbers)
  const worth = getWorth(matches)

  return { cardId: +cardId, winningNumbers, existingNumbers, matches, worth }
}

export const getWorth = (matches: number[]) => {
  let worth = 0

  matches.forEach((match, i) => {
    if (i === 0) worth = 1
    else worth *= 2
  })
  return worth
}

const findMatches = (winningNumbers: number[], existingNumbers: number[]) => {
  const matches: number[] = []

  winningNumbers.forEach((winningNumber) => {
    existingNumbers.forEach((existingNumber) => {
      if (winningNumber === existingNumber) matches.push(winningNumber)
    })
  })
  return matches
}

const convertToArrOfNumbers = (seq: string): number[] =>
  seq
    .split(' ')
    .filter((num) => num !== '')
    .map((num) => +num)
