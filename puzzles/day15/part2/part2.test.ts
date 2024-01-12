import { describe, expect, it } from 'bun:test'
import {
  Lense,
  LenseRemoval,
  day15Part2,
  hashAlgorithm,
  makeBoxSeries,
  parseStep,
  processLenseSteps,
} from './part2'

describe('Day15Part2', () => {
  it('should', () => {
    const input = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'
    expect(day15Part2(input)).toEqual(145)
  })
})

describe('Process Lense Steps', () => {
  it('should add lenses', () => {
    const result = processLenseSteps(['rn=1', 'qp=3', 'cm=2'])
    expect(result[0].length).toEqual(2)
    expect(result[0][0].id).toEqual('rn')
    expect(result[0][1].id).toEqual('cm')
    expect(result[1][0].id).toEqual('qp')
    expect(result[1][0].focalLength).toEqual(3)
  })

  it('should update lense when exists', () => {
    const result = processLenseSteps(['rn=1', 'rn=5'])
    expect(result[0].length).toEqual(1)
    expect(result[0][0].focalLength).toEqual(5)
  })

  it('should remove lenses', () => {
    const result = processLenseSteps(['rn=1', 'cm=5', 'rn-'])
    expect(result[0].length).toEqual(1)
    expect(result[0][0].id).toEqual('cm')
  })
})

describe('Make Box Series', () => {
  it('should be correct', () => {
    expect(makeBoxSeries().length).toEqual(256)
  })
})

describe('Hash Algorithm', () => {
  it('should be correct', () => {
    expect(hashAlgorithm('qp')).toEqual(1)
    expect(hashAlgorithm('pc')).toEqual(3)
  })
})

describe('Parse Step', () => {
  it('should parse lense', () => {
    const result = parseStep('rn=1') as Lense
    expect(result.focalLength).toEqual(1)
    expect(result.operator).toEqual('=')
    expect(result.id).toEqual('rn')
  })

  it('should parse lense', () => {
    const result = parseStep('cm-') as LenseRemoval
    expect(result.operator).toEqual('-')
    expect(result.id).toEqual('cm')
  })
})
