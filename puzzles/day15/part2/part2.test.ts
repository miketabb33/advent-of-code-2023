import { describe, expect, it } from 'bun:test'
import { day15Part2, makeBoxSeries } from './part2'

describe('Day15Part2', () => {
  it('should calc example', () => {
    const input = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'
    day15Part2(input)
  })
})

describe('Make Box Series', () => {
  it('should be correct', () => {
    expect(makeBoxSeries().length).toEqual(256)
  })
})
