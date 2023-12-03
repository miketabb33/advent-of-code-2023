export type GameResult = {
  result: 'possible' | 'impossible'
  game: Game
}

export type Game = {
  id: number
  rounds: Round[]
}

export type Round = {
  green: number
  blue: number
  red: number
}
