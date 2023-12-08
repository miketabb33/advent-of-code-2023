import { describe, expect, it } from 'bun:test'
import { parseNetworkNodes } from './parseNetworkNodes'
import { findEndingNodeStepsRequired, findNode } from './processNetwork'

describe('Find Starting Node', () => {
  it('should find', () => {
    const input =
      'BBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nAAA = (BBB, CCC)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)'
    const network = parseNetworkNodes(input)

    const result = findNode('AAA', network)
    expect(result).toEqual({ origin: 'AAA', left: 'BBB', right: 'CCC' })
  })
})

describe('Find Ending Node', () => {
  it('should find 1', () => {
    const input = 'AAA = (ZZZ, CCC)\nZZZ = (ZZZ, ZZZ)'
    const network = parseNetworkNodes(input)
    const startingNode = findNode('AAA', network)
    const instructions = ['L']

    const result = findEndingNodeStepsRequired(
      instructions,
      startingNode,
      network
    )

    expect(result).toEqual(1)
  })

  it('should find from example', () => {
    const input =
      'AAA = (BBB, CCC)\nBBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)'
    const network = parseNetworkNodes(input)
    const startingNode = findNode('AAA', network)
    const instructions = ['R', 'L']

    const result = findEndingNodeStepsRequired(
      instructions,
      startingNode,
      network
    )

    expect(result).toEqual(2)
  })
})
