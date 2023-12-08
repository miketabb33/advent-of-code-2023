import { describe, expect, it } from 'bun:test'
import { parseNetworkNodes } from './parseNetworkNodes'

describe('Parse network Nodes', () => {
  it('should parse input', () => {
    const input =
      'AAA = (BBB, CCC)\nBBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)'
    const results = parseNetworkNodes(input)
    expect(results.length).toEqual(7)

    expect(results[0].origin).toEqual('AAA')
    expect(results[0].left).toEqual('BBB')
    expect(results[0].right).toEqual('CCC')

    expect(results[3].left).toEqual('DDD')
  })
})
