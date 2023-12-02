import { describe, expect, it } from 'bun:test'
import { getCombinedNumber } from './getCombinedNumber'

describe('Get Combined Number', () => {
  it('should return 55 when only 5 exists at start', () => {
    const input = '5hifdjafdals'
    expect(getCombinedNumber(input)).toEqual(55)
  })
  it('should return 33 when only 3 exists at the end', () => {
    const input = 'hjafdals3'
    expect(getCombinedNumber(input)).toEqual(33)
  })
  it('should return 66 when only 6 exists in the middle', () => {
    const input = 'hjaf6dals'
    expect(getCombinedNumber(input)).toEqual(66)
  })
  it('should return 66 when only 6 exists somewhere else in the middle', () => {
    const input = 'hjafda6ls'
    expect(getCombinedNumber(input)).toEqual(66)
  })
  it('should return 66 when only 6 exists somewhere else in the middle', () => {
    const input = 'hj6afdals'
    expect(getCombinedNumber(input)).toEqual(66)
  })
  it('should return 66 when only 6 exists somewhere else in the middle', () => {
    const input = 'hjfodsipjposddafklesnfiuhfdsaifnd6sklfndsafafdals'
    expect(getCombinedNumber(input)).toEqual(66)
  })
  it('should return 34 when starts with 3 and ends with 4', () => {
    const input = '3hjfodsipjposddafklesnfiuhfdsaifndsklfndsafafdals4'
    expect(getCombinedNumber(input)).toEqual(34)
  })
  it('should return 34 when starts with 3 and ends with 4 and numbers are in the middle', () => {
    const input = '3hjfo5dsip4jposddafkles3nfiuhf2dsaifnd3sklfnds5afafdals4'
    expect(getCombinedNumber(input)).toEqual(34)
  })
  it('should return 65 when given threenbf6zhtwo95nine', () => {
    const input = 'threenbf6zhtwo95nine'
    expect(getCombinedNumber(input)).toEqual(65)
  })
  it('should return 99 when given l9', () => {
    const input = 'l9'
    expect(getCombinedNumber(input)).toEqual(99)
  })
})
