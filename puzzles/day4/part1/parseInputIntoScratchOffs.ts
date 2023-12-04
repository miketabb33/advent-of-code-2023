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

  return { cardId: +cardId, winningNumbers, existingNumbers }
}

const convertToArrOfNumbers = (seq: string): number[] =>
  seq
    .split(' ')
    .filter((num) => num !== '')
    .map((num) => +num)
