import { describe, expect, it } from 'bun:test'
import { assignSortValue, separateWildHands, sortHands } from './rankCards'
import { parseCamelHand } from './parseCamelHand'

describe('Separate Hands', () => {
  it('should return empty when given empty', () => {
    expect(separateWildHands([])).toEqual([[], [], [], [], [], [], []])
  })
  it('should split types into ordered arrays', () => {
    const input =
      '3J4KT 513\nKKKKK 147\n29JQK 187\nAAKA9 821\n555J5 571\n64JQ2 388\nA29J2 877\n33399 59\nAJ7A8 312\n3AA83 474'
    const results = separateWildHands(parseCamelHand(input))

    expect(results[0].length).toEqual(0)
    expect(results[1].length).toEqual(3)
    expect(results[2].length).toEqual(1)
    expect(results[3].length).toEqual(3)
    expect(results[4].length).toEqual(1)
    expect(results[5].length).toEqual(0)
    expect(results[6].length).toEqual(2)

    expect(results[1][0].bid).toEqual(513)
    expect(results[1][1].bid).toEqual(187)
    expect(results[1][2].bid).toEqual(388)
    expect(results[2][0].bid).toEqual(474)
    expect(results[3][0].bid).toEqual(821)
    expect(results[3][1].bid).toEqual(877)
    expect(results[3][2].bid).toEqual(312)
    expect(results[4][0].bid).toEqual(59)
    expect(results[6][0].bid).toEqual(147)
    expect(results[6][1].bid).toEqual(571)
  })
})

describe('Sort Hands', () => {
  it('should return empty when given empty', () => {
    expect(sortHands([])).toEqual([])
  })
  it('should sort when first index is different', () => {
    const input = '3J4KT 513\n8KKKK 147\n29JQK 187\nA9JQK 202\nT9J3K 499'
    const results = sortHands(parseCamelHand(input))
    expect(results.length).toEqual(5)

    expect(results[0].bid).toEqual(187)
    expect(results[1].bid).toEqual(513)
    expect(results[2].bid).toEqual(147)
    expect(results[3].bid).toEqual(499)
    expect(results[4].bid).toEqual(202)
  })
  it('should sort when second index is different', () => {
    const input = '36KTA 513\n3KKKK 147\n39JQK 187'
    const results = sortHands(parseCamelHand(input))
    expect(results.length).toEqual(3)

    expect(results[0].bid).toEqual(513)
    expect(results[1].bid).toEqual(187)
    expect(results[2].bid).toEqual(147)
  })
  it('should sort when thirt index is different', () => {
    const input = '369TA 513\n36QKK 147\n363QK 187'
    const results = sortHands(parseCamelHand(input))
    expect(results.length).toEqual(3)

    expect(results[0].bid).toEqual(187)
    expect(results[1].bid).toEqual(513)
    expect(results[2].bid).toEqual(147)
  })
  it('should sort when fourth index is different', () => {
    const input = 'TT3TA 513\nTT38K 147\nTT32K 187'
    const results = sortHands(parseCamelHand(input))
    expect(results.length).toEqual(3)

    expect(results[0].bid).toEqual(187)
    expect(results[1].bid).toEqual(147)
    expect(results[2].bid).toEqual(513)
  })
  it('should sort when fifth index is different', () => {
    const input = '68533 513\n68532 147\n6853J 187'
    const results = sortHands(parseCamelHand(input))
    expect(results.length).toEqual(3)

    expect(results[0].bid).toEqual(187)
    expect(results[1].bid).toEqual(147)
    expect(results[2].bid).toEqual(513)
  })
  it('should break tie', () => {
    const input = 'QQQQ2 513\nJKKK2 147'
    const results = sortHands(parseCamelHand(input))
    expect(results.length).toEqual(2)

    expect(results[0].bid).toEqual(147)
    expect(results[1].bid).toEqual(513)
  })
  it('should sort example', () => {
    const input =
      '2345A 1\nQ2KJJ 13\nQ2Q2Q 19\nT3T3J 17\nT3Q33 11\n2345J 3\nJ345A 2\n32T3K 5\nT55J5 29\nKK677 7\nKTJJT 34\nQQQJA 31\nJJJJJ 37\nJAAAA 43\nAAAAJ 59\nAAAAA 61\n2AAAA 23\n2JJJJ 53\nJJJJ2 41'
    const hands = separateWildHands(parseCamelHand(input))
    const results1 = sortHands(hands[0])
    const results2 = sortHands(hands[1])

    expect(results1.length).toEqual(1)

    expect(results1[0].bid).toEqual(1)

    expect(results2.length).toEqual(3)

    expect(results2[0].bid).toEqual(2)
    expect(results2[1].bid).toEqual(3)
    expect(results2[2].bid).toEqual(5)
  })
})

describe('Assign Sort Value', () => {
  it.each(['2', '3', '4', '5', '6', '7', '8', '9'])(
    'should return number when given %s',
    (value) => {
      expect(assignSortValue(value)).toEqual(+value)
    }
  )

  it('should return number for suites', () => {
    expect(assignSortValue('T')).toEqual(10)
    expect(assignSortValue('J')).toEqual(1)
    expect(assignSortValue('Q')).toEqual(12)
    expect(assignSortValue('K')).toEqual(13)
    expect(assignSortValue('A')).toEqual(14)
  })
})
