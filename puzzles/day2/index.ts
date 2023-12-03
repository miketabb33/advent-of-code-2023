import { readFileSync } from 'fs'
import { parseInputIntoGames } from './part1/parseInputIntoGames'
import { calculateGamesResults } from './part1/calculatePossibleGames'
import { calculatePowerOfFewestForGames } from './part2/calculatePowerOfFewest'

const inputBuffer = readFileSync(`${__dirname}/input`)

const answer1 = () => {
  const games = parseInputIntoGames(inputBuffer.toString())
  const gameResults = calculateGamesResults(games)
  const possibleGameResults = gameResults.filter(
    (game) => game.result === 'possible'
  )

  let sum = 0
  possibleGameResults.forEach((result) => (sum += result.game.id))

  return sum
}

const answer2 = () => {
  const games = parseInputIntoGames(inputBuffer.toString())
  const gameResults = calculatePowerOfFewestForGames(games)

  let sum = 0
  gameResults.forEach((result) => (sum += result.power))

  return sum
}

console.log('answer1: ', answer1())
console.log('answer2: ', answer2())
