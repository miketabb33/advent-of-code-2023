import { describe, expect, it } from 'bun:test'
import { calculateStep, day15Part2 } from './part2'

describe('Day15Part2', () => {
  it('should calc example', () => {
    const input = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'
    expect(day15Part2(input)).toEqual(1320)
  })
})

describe('Calculate Step', () => {
  it('should return for HASH', () => {
    expect(calculateStep('HASH')).toEqual(52)
  })
  it('should return for examples', () => {
    expect(calculateStep('rn=1')).toEqual(30)
    expect(calculateStep('cm-')).toEqual(253)
    expect(calculateStep('qp=3')).toEqual(97)
    expect(calculateStep('cm=2')).toEqual(47)
    expect(calculateStep('qp-')).toEqual(14)
    expect(calculateStep('pc=4')).toEqual(180)
    expect(calculateStep('ot=9')).toEqual(9)
    expect(calculateStep('ab=5')).toEqual(197)
    expect(calculateStep('pc-')).toEqual(48)
    expect(calculateStep('pc=6')).toEqual(214)
    expect(calculateStep('ot=7')).toEqual(231)
  })
})
