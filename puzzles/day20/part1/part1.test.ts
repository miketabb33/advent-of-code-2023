import { describe, expect, it } from 'bun:test'
import { readFileSync } from 'fs'
import { BroadcasterModule } from './modules'
import { PulseParser } from './pulseParser.test'

const input1 = readFileSync(`${__dirname}/../example1`).toString()
const parser = new PulseParser()
const moduleMap1 = parser.parse(input1)

describe('Broadcaster Module', () => {
  it('should return low when given low', () => {
    const broadcaster = moduleMap1.get('broadcaster')!
    const result = broadcaster.process([{ type: 'low', destination: '' }])
    expect(result[0]).toEqual({ type: 'low', destination: 'a' })
    expect(result[1]).toEqual({ type: 'low', destination: 'b' })
    expect(result[2]).toEqual({ type: 'low', destination: 'c' })
  })

  it('should return high when given high', () => {
    const broadcaster = moduleMap1.get('broadcaster')!
    const result = broadcaster.process([{ type: 'high', destination: '' }])
    expect(result[0]).toEqual({ type: 'high', destination: 'a' })
    expect(result[1]).toEqual({ type: 'high', destination: 'b' })
    expect(result[2]).toEqual({ type: 'high', destination: 'c' })
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
