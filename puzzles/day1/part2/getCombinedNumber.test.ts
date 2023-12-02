import { describe, expect, it } from 'bun:test'
import { getCombinedNumber2 } from './getCombinedNumber'

describe('Get Combined Number', () => {
  it('should return 88 when only eight exists at start', () => {
    const input = 'eighthifdjafdals'
    expect(getCombinedNumber2(input)).toEqual(88)
  })
  it('should return 8 when only eight exists at start', () => {
    const input = '8hifdjafdals'
    expect(getCombinedNumber2(input)).toEqual(88)
  })
  it('should return 77 when only 7 exists at end', () => {
    const input = 'hifdjafdals7'
    expect(getCombinedNumber2(input)).toEqual(77)
  })
  it('should return 77 when only seven exists at end', () => {
    const input = 'hifdjafdalsSeven'
    expect(getCombinedNumber2(input)).toEqual(77)
  })
  it('should return 66 when only 6 exists in the middle', () => {
    const input = 'hifdjaf6dals'
    expect(getCombinedNumber2(input)).toEqual(66)
  })
  it('should return 66 when only six exists in the middle', () => {
    const input = 'hifdjafsixdals'
    expect(getCombinedNumber2(input)).toEqual(66)
  })
  it('should return 88 when only eight exists at start', () => {
    const input = 'eight9hif7dja8ftwodals8'
    expect(getCombinedNumber2(input)).toEqual(88)
  })
  it('should return 76 when only 7 exists at start and 6 at end', () => {
    const input = '79hif7dja8ftwodals6'
    expect(getCombinedNumber2(input)).toEqual(76)
  })
})
