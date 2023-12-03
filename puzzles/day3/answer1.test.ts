import { describe, expect, it } from 'bun:test'
import { answer1 } from './answer1'

describe('answer 1', () => {
  it('should calculate answer 1, 631+769+148', () => {
    const input =
      '.......*...........*.....*...........*........631%...703.......*..12....652.................*.$............368.769*148.................*....'
    expect(answer1(input)).toEqual(1548)
  })
})
