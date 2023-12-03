import { describe, expect, it } from 'bun:test'
import { Game } from '../types'
import { calculatePowerOfFewest } from './calculatePowerOfFewest'

describe('Calculate Power Of Fewest', () => {
  it('should get the power of all 3 cubes when given 1 round', () => {
    const game: Game = {
      id: 1,
      rounds: [{ blue: 2, red: 2, green: 2 }],
    }
    expect(calculatePowerOfFewest(game)).toEqual({ power: 8, game })
  })
  it('should get the power of the highest cube from each color when combined, {blue 4, red 10, green 5}', () => {
    const game: Game = {
      id: 1,
      rounds: [
        { blue: 2, red: 10, green: 5 },
        { blue: 4, red: 5, green: 4 },
      ],
    }
    expect(calculatePowerOfFewest(game)).toEqual({ power: 200, game })
  })
  it('should get the power of the highest cube from each color when combined, {blue 4, red 10, green 5}', () => {
    const game: Game = {
      id: 1,
      rounds: [
        { blue: 6, red: 1, green: 3 },
        { blue: 0, red: 6, green: 3 },
        { blue: 15, red: 14, green: 3 },
      ],
    }
    expect(calculatePowerOfFewest(game)).toEqual({ power: 630, game })
  })
})
