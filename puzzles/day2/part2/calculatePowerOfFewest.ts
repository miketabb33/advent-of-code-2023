import { Game, GamePower } from '../types'

export const calculatePowerOfFewestForGames = (games: Game[]): GamePower[] =>
  games.map(calculatePowerOfFewest)

export const calculatePowerOfFewest = (game: Game): GamePower => {
  let highestBlue = 0
  let highestRed = 0
  let highestGreen = 0

  game.rounds.forEach((round) => {
    if (round.blue > highestBlue) highestBlue = round.blue
    if (round.red > highestRed) highestRed = round.red
    if (round.green > highestGreen) highestGreen = round.green
  })

  const power = highestBlue * highestRed * highestGreen

  const gamePower: GamePower = { power, game }

  return gamePower
}
