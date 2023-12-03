import { Game, GameResult } from './types'

const RED_LIMIT = 12
const GREEN_LIMIT = 13
const BLUE_LIMIT = 14

export const calculateGamesResults = (games: Game[]): GameResult[] =>
  games.map(calculateGameResult)

export const calculateGameResult = (game: Game): GameResult => {
  const gameResult: GameResult = { result: 'possible', game }

  for (let i = 0; i < game.rounds.length; i++) {
    let round = game.rounds[i]

    const isExceedsLimit =
      round.red > RED_LIMIT ||
      round.green > GREEN_LIMIT ||
      round.blue > BLUE_LIMIT

    if (isExceedsLimit) {
      gameResult.result = 'impossible'
      break
    }
  }

  return gameResult
}
