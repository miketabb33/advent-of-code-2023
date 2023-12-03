import { describe, expect, it } from 'bun:test'
import { parseLineIntoGame } from './parseInputIntoGames'
import { Game } from './types'

describe('Parse Input Into Games', () => {
  it('should return a game with 1 round', () => {
    const input = 'Game 1: 1 blue, 1 red'

    const expectedResult: Game = {
      id: 1,
      rounds: [{ blue: 1, red: 1, green: 0 }],
    }
    expect(parseLineIntoGame(input)).toEqual(expectedResult)
  })

  it('should return a game with many rounds', () => {
    const input =
      'Game 31: 8 red, 16 green, 1 blue; 10 red, 3 blue, 11 green; 2 green, 4 blue, 3 red; 2 blue, 7 red, 12 green; 16 green, 9 red, 6 blue; 8 blue, 9 red, 11 green'

    const expectedResult: Game = {
      id: 31,
      rounds: [
        { blue: 1, red: 8, green: 16 },
        { blue: 3, red: 10, green: 11 },
        { blue: 4, red: 3, green: 2 },
        { blue: 2, red: 7, green: 12 },
        { blue: 6, red: 9, green: 16 },
        { blue: 8, red: 9, green: 11 },
      ],
    }
    expect(parseLineIntoGame(input)).toEqual(expectedResult)
  })
})
