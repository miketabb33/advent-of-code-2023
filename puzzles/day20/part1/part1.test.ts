import { describe, expect, it } from 'bun:test'
import { readFileSync } from 'fs'
import { PulseParser } from './pulseParser.test'
import { day20Part1 } from './part1'

const input1 = readFileSync(`${__dirname}/../example1`).toString()
const input2 = readFileSync(`${__dirname}/../example2`).toString()

const moduleMap1 = new PulseParser().parse(input1)
const moduleMap2 = new PulseParser().parse(input2)

describe('EX1', () => {
  it('should go', () => {
    expect(day20Part1(input1)).toEqual(32_000_000)
  })
})

describe('EX2', () => {
  it('should go', () => {
    // Not handling output
    // expect(day20Part1(input2)).toEqual(11_687_500)
  })
})

describe('Broadcaster Module', () => {
  describe('example 1', () => {
    it('should return low when given low', () => {
      const broadcaster = moduleMap1.get('broadcaster')!
      const result = broadcaster.process('low')
      expect(result[0]).toEqual({
        pulse: 'low',
        input: 'broadcaster',
        destination: 'a',
      })
      expect(result[1]).toEqual({
        pulse: 'low',
        input: 'broadcaster',
        destination: 'b',
      })
      expect(result[2]).toEqual({
        pulse: 'low',
        input: 'broadcaster',
        destination: 'c',
      })
    })

    it('should return high when given high', () => {
      const broadcaster = moduleMap1.get('broadcaster')!
      const result = broadcaster.process('high')
      expect(result[0]).toEqual({
        pulse: 'high',
        input: 'broadcaster',
        destination: 'a',
      })
      expect(result[1]).toEqual({
        pulse: 'high',
        input: 'broadcaster',
        destination: 'b',
      })
      expect(result[2]).toEqual({
        pulse: 'high',
        input: 'broadcaster',
        destination: 'c',
      })
    })
  })

  describe('example 2', () => {
    it('should return', () => {
      const broadcaster = moduleMap2.get('broadcaster')!
      const result = broadcaster.process('low')
      expect(result[0]).toEqual({
        pulse: 'low',
        input: 'broadcaster',
        destination: 'a',
      })
    })
  })
})

describe('Flip Flop Module', () => {
  describe('example 1', () => {
    it('should return null when given high pulse', () => {
      const flipflop = moduleMap1.get('a')!
      expect(flipflop.type).toEqual('flipflop')
      const result = flipflop.process('high')
      expect(result).toBeEmpty()
    })

    it('should toggle a return of high and low pulses when given a low pulse', () => {
      const flipflop = moduleMap1.get('a')!
      expect(flipflop.type).toEqual('flipflop')

      const result1 = flipflop.process('low')
      expect(result1[0]).toEqual({
        pulse: 'high',
        input: 'a',
        destination: 'b',
      })

      const result2 = flipflop.process('low')
      expect(result2[0]).toEqual({ pulse: 'low', input: 'a', destination: 'b' })

      const result3 = flipflop.process('low')
      expect(result3[0]).toEqual({
        pulse: 'high',
        input: 'a',
        destination: 'b',
      })
    })
  })

  describe('example 2', () => {
    it('should return null when given high pulse', () => {
      const flipflop = moduleMap2.get('a')!
      expect(flipflop.type).toEqual('flipflop')
      const result = flipflop.process('high')
      expect(result).toBeEmpty()
    })

    it('should flip flop', () => {
      const flipflop = moduleMap2.get('a')!
      expect(flipflop.type).toEqual('flipflop')
      const result1 = flipflop.process('low')
      expect(result1[0]).toEqual({
        pulse: 'high',
        input: 'a',
        destination: 'inv',
      })
      expect(result1[1]).toEqual({
        pulse: 'high',
        input: 'a',
        destination: 'con',
      })

      const result2 = flipflop.process('low')
      expect(result2[0]).toEqual({
        pulse: 'low',
        input: 'a',
        destination: 'inv',
      })
      expect(result2[1]).toEqual({
        pulse: 'low',
        input: 'a',
        destination: 'con',
      })
    })
  })
})

describe('Conjunction Module', () => {
  describe('example 1', () => {
    it('should set low and high pulses', () => {
      const conjunction = moduleMap2.get('inv')!
      expect(conjunction.type).toEqual('conjunction')
      const result1 = conjunction.process('low', 'c')
      expect(result1[0]).toEqual({
        pulse: 'high',
        input: 'inv',
        destination: 'b',
      })

      const result2 = conjunction.process('high', 'c')
      expect(result2[0]).toEqual({
        pulse: 'low',
        input: 'inv',
        destination: 'b',
      })
    })
  })
})

describe('parser', () => {
  it('should parse broadcaster', () => {
    const parser = new PulseParser()
    const results = parser.parse(input1)

    const result1 = results.get('broadcaster')!
    expect(result1.type).toEqual('broadcaster')
    expect(result1.destinations).toEqual(['a', 'b', 'c'])
    expect(result1.id).toEqual('broadcaster')

    const result2 = results.get('a')!
    expect(result2.type).toEqual('flipflop')
    expect(result2.id).toEqual('a')
    expect(result2.destinations).toEqual(['b'])

    const result3 = results.get('b')!
    expect(result3.type).toEqual('flipflop')
    expect(result3.id).toEqual('b')
    expect(result3.destinations).toEqual(['c'])

    const result4 = results.get('c')!
    expect(result4.type).toEqual('flipflop')
    expect(result4.id).toEqual('c')
    expect(result4.destinations).toEqual(['inv'])

    const result5 = results.get('inv')!
    expect(result5.type).toEqual('conjunction')
    expect(result5.id).toEqual('inv')
    expect(result5.destinations).toEqual(['a'])

    expect(results.get('missing')).toBeUndefined()
  })

  it('should throw when input is invalid', () => {
    const subject = new PulseParser()
    expect(() => subject.parse('bobby')).toThrow()
  })
})
