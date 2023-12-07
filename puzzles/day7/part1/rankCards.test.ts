import { describe, expect, it } from 'bun:test'
import { assignSortValue, separateHands, sortHands } from './rankCards'
import { parseCamelHand } from './parseCamelHand'

describe('Separate Hands', () => {
  it('should return empty when given empty', () => {
    expect(separateHands([])).toEqual([[], [], [], [], [], [], []])
  })
  it('should split types into ordered arrays', () => {
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

    expect(results[0].bid).toEqual(147)
    expect(results[1].bid).toEqual(513)
    expect(results[2].bid).toEqual(187)
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
    expect(assignSortValue('J')).toEqual(11)
    expect(assignSortValue('Q')).toEqual(12)
    expect(assignSortValue('K')).toEqual(13)
    expect(assignSortValue('A')).toEqual(14)
  })
})
