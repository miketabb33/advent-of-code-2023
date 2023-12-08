import { describe, expect, it } from 'bun:test'
import {
  calculateHandType,
  parseCamelHand,
  parseWildCards,
} from './parseCamelHand'

describe('Parse Camel Hand', () => {
  it('should parse example', () => {
    const input = '32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483'
    const results = parseCamelHand(input)
    expect(results.length).toEqual(5)
    expect(results[0].cards).toEqual('32T3K')
    expect(results[0].bid).toEqual(765)
    expect(results[0].type).toEqual('1pair')
    expect(results[0].wildCards).toEqual('32T3K')
    expect(results[0].wildType).toEqual('1pair')

    expect(results[1].cards).toEqual('T55J5')
    expect(results[1].bid).toEqual(684)
    expect(results[1].type).toEqual('3ofKind')
    expect(results[1].wildCards).toEqual('T5555')
    expect(results[1].wildType).toEqual('4ofKind')

    expect(results[2].cards).toEqual('KK677')
    expect(results[2].bid).toEqual(28)
    expect(results[2].type).toEqual('2pairs')
    expect(results[2].wildCards).toEqual('KK677')
    expect(results[2].wildType).toEqual('2pairs')

    expect(results[3].cards).toEqual('KTJJT')
    expect(results[3].bid).toEqual(220)
    expect(results[3].type).toEqual('2pairs')
    expect(results[3].wildCards).toEqual('KTTTT')
    expect(results[3].wildType).toEqual('4ofKind')

    expect(results[4].cards).toEqual('QQQJA')
    expect(results[4].bid).toEqual(483)
    expect(results[4].type).toEqual('3ofKind')
    expect(results[4].wildCards).toEqual('QQQQA')
    expect(results[4].wildType).toEqual('4ofKind')
  })
})

describe('Parse Wild Cards', () => {
  it('should parse example', () => {
    expect(parseWildCards('32T3K')).toEqual('32T3K')
    expect(parseWildCards('T55J5')).toEqual('T5555')
    expect(parseWildCards('KK677')).toEqual('KK677')
    expect(parseWildCards('KTJJT')).toEqual('KTTTT')
    expect(parseWildCards('QQQJA')).toEqual('QQQQA')
    expect(parseWildCards('555J5')).toEqual('55555')
    expect(parseWildCards('Q96AJ')).toEqual('Q96AQ')
    expect(parseWildCards('JTT44')).toEqual('TTT44')
  })
})

describe('Calculate Hand Type', () => {
  describe('5 of a kind', () => {
    it('should return for 22222', () => {
      const cards = '22222'
      expect(calculateHandType(cards)).toEqual('5ofKind')
    })
    it('should return for 99999', () => {
      const cards = '99999'
      expect(calculateHandType(cards)).toEqual('5ofKind')
    })
    it('should return for AAAAA', () => {
      const cards = 'AAAAA'
      expect(calculateHandType(cards)).toEqual('5ofKind')
    })
  })
  describe('4 of a kind', () => {
    it('should return for 35555', () => {
      const cards = '35555'
      expect(calculateHandType(cards)).toEqual('4ofKind')
    })
    it('should return for TT6TT', () => {
      const cards = 'TT6TT'
      expect(calculateHandType(cards)).toEqual('4ofKind')
    })
    it('should return for AKAAA', () => {
      const cards = 'AKAAA'
      expect(calculateHandType(cards)).toEqual('4ofKind')
    })
    it('should return for 7777Q', () => {
      const cards = '7777Q'
      expect(calculateHandType(cards)).toEqual('4ofKind')
    })
  })
  describe('Full House', () => {
    it('should return for KKQQQ', () => {
      const cards = 'KKQQQ'
      expect(calculateHandType(cards)).toEqual('fullHouse')
    })
    it('should return for 33366', () => {
      const cards = '33366'
      expect(calculateHandType(cards)).toEqual('fullHouse')
    })
    it('should return for 8J8J8', () => {
      const cards = '8J8J8'
      expect(calculateHandType(cards)).toEqual('fullHouse')
    })
    it('should return for 67766', () => {
      const cards = '67766'
      expect(calculateHandType(cards)).toEqual('fullHouse')
    })
  })
  describe('3 of a kind', () => {
    it('should return for 53433', () => {
      const cards = '53433'
      expect(calculateHandType(cards)).toEqual('3ofKind')
    })
    it('should return for TTT23', () => {
      const cards = 'TTT23'
      expect(calculateHandType(cards)).toEqual('3ofKind')
    })
    it('should return for Q3QJQ', () => {
      const cards = 'Q3QJQ'
      expect(calculateHandType(cards)).toEqual('3ofKind')
    })
    it('should return for 42A22', () => {
      const cards = '42A22'
      expect(calculateHandType(cards)).toEqual('3ofKind')
    })
  })
  describe('2 pairs', () => {
    it('should return for 4466T', () => {
      const cards = '4466T'
      expect(calculateHandType(cards)).toEqual('2pairs')
    })
    it('should return for Q5599', () => {
      const cards = 'Q5599'
      expect(calculateHandType(cards)).toEqual('2pairs')
    })
    it('should return for 6AJA6', () => {
      const cards = '6AJA6'
      expect(calculateHandType(cards)).toEqual('2pairs')
    })
    it('should return for T3883', () => {
      const cards = 'T3883'
      expect(calculateHandType(cards)).toEqual('2pairs')
    })
  })
  describe('1 pair', () => {
    it('should return for 44TQ3', () => {
      const cards = '44TQ3'
      expect(calculateHandType(cards)).toEqual('1pair')
    })
    it('should return for QTQK4', () => {
      const cards = 'QTQK4'
      expect(calculateHandType(cards)).toEqual('1pair')
    })
    it('should return for 498JJ', () => {
      const cards = '498JJ'
      expect(calculateHandType(cards)).toEqual('1pair')
    })
    it('should return for 469Q4', () => {
      const cards = '469Q4'
      expect(calculateHandType(cards)).toEqual('1pair')
    })
    it('should return for 38T89', () => {
      const cards = '38T89'
      expect(calculateHandType(cards)).toEqual('1pair')
    })
    it('should return for 5A717', () => {
      const cards = '5A717'
      expect(calculateHandType(cards)).toEqual('1pair')
    })
  })
  describe('High Card', () => {
    it('should return for 4962A', () => {
      const cards = '4962A'
      expect(calculateHandType(cards)).toEqual('highCard')
    })
    it('should return for JKAT9', () => {
      const cards = 'JKAT9'
      expect(calculateHandType(cards)).toEqual('highCard')
    })
    it('should return for 39A8J', () => {
      const cards = '39A8J'
      expect(calculateHandType(cards)).toEqual('highCard')
    })
    it('should return for 2497K', () => {
      const cards = '2497K'
      expect(calculateHandType(cards)).toEqual('highCard')
    })
  })
})
