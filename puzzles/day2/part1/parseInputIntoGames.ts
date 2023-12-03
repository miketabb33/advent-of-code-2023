import { Game, Round } from '../types'

export const parseInputIntoGames = (input: string): Game[] => {
  const lines = input.split('\n').filter((line) => line !== '')
  return lines.map(parseLineIntoGame)
}

export const parseLineIntoGame = (line: string): Game => {
  const idAndRounds = line.split(':')
  const id = idAndRounds[0].replace('Game ', '')
  const rounds = idAndRounds[1].trim().split(';')

  const game: Game = {
    id: +id,
    rounds: rounds.map(buildRound),
  }
  return game
}

const buildRound = (round: string): Round => {
  const newRound = { red: 0, blue: 0, green: 0 }

  round.split(',').forEach((cube) => {
    const attr = cube.trim().split(' ')
    const color = attr[1] as 'blue' | 'red' | 'green'
    const value = attr[0]
    newRound[color] = +value
  })

  return newRound
}
