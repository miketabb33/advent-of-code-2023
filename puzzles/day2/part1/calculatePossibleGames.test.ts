import { describe, expect, it } from 'bun:test'
import { calculateGameResult } from './calculatePossibleGames'
import { Game } from '../types'

describe('Calculate Game Result', () => {
  it('should return possible when the only round is possible', () => {
    const game: Game = {
      id: 1,
      rounds: [{ red: 1, blue: 1, green: 1 }],
    }
    expect(calculateGameResult(game)).toEqual({ result: 'possible', game })
  })
  it('should return possible when the only round is possible and cubes are at max values', () => {
    const game: Game = {
      id: 1,
      rounds: [{ red: 12, green: 13, blue: 14 }],
    }
    expect(calculateGameResult(game)).toEqual({ result: 'possible', game })
  })
  it('should return impossible when red is over 12', () => {
    const game: Game = {
      id: 1,
      rounds: [{ red: 13, green: 1, blue: 1 }],
    }
    expect(calculateGameResult(game)).toEqual({ result: 'impossible', game })
  })
  it('should return impossible when green is over 13', () => {
    const game: Game = {
      id: 1,
      rounds: [{ red: 1, green: 14, blue: 1 }],
    }
    expect(calculateGameResult(game)).toEqual({ result: 'impossible', game })
  })
  it('should return impossible when blue is over 14', () => {
    const game: Game = {
      id: 1,
      rounds: [{ red: 1, green: 1, blue: 15 }],
    }
    expect(calculateGameResult(game)).toEqual({ result: 'impossible', game })
  })
})
