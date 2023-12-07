import { describe, expect, it } from 'bun:test'
import { separateHands } from './rankCards'
import { parseCamelHand } from './parseCamelHand'

describe('Separate Hands', () => {
  it('should return empty when given empty', () => {
    expect(separateHands([])).toEqual([[], [], [], [], [], [], []])
  })
  it('should return empty when given empty', () => {
    const input =
      '3J4KT 513\nKKKKK 147\n29JQK 187\nAAKA9 821\n555J5 571\n64JQ2 388\nA29J2 877\n33399 59\nAJ7A8 312\n3AA83 474'
    const results = separateHands(parseCamelHand(input))

    expect(results[0].length).toEqual(3)
    expect(results[1].length).toEqual(2)
    expect(results[2].length).toEqual(1)
    expect(results[3].length).toEqual(1)
    expect(results[4].length).toEqual(1)
    expect(results[5].length).toEqual(1)
    expect(results[6].length).toEqual(1)

    expect(results[0][0].bid).toEqual(513)
    expect(results[0][1].bid).toEqual(187)
    expect(results[0][2].bid).toEqual(388)
    expect(results[1][0].bid).toEqual(877)
    expect(results[2][0].bid).toEqual(474)
    expect(results[1][1].bid).toEqual(312)
    expect(results[3][0].bid).toEqual(821)
    expect(results[4][0].bid).toEqual(59)
    expect(results[5][0].bid).toEqual(571)
    expect(results[6][0].bid).toEqual(147)
  })
})
