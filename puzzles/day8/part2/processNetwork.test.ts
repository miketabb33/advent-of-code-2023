import { describe, expect, it } from 'bun:test'
import {
  allNodesEndInZ,
  findAllNodesEndingWith,
  findEndingNodesStepsRequired,
  findNextNodeGroup,
  findNode,
  getInstruction,
  nodeEndsWith,
} from './processNetwork'
import { parseNetworkNodes } from '../part1/parseNetworkNodes'
import { NetworkNode } from '../part1/types'

describe('Find All Nodes Ending With', () => {
  it('should find', () => {
    const input =
      '11A = (11B, XXX)\n11B = (XXX, 11Z)\n11Z = (11B, XXX)\n22A = (22B, XXX)\n22B = (22C, 22C)\n22C = (22Z, 22Z)\n22Z = (22B, 22B)\nXXX = (XXX, XXX)'
    const network = parseNetworkNodes(input)

    const results = findAllNodesEndingWith('A', network)
    expect(results.length).toEqual(2)
    expect(results[0]).toEqual({ origin: '11A', left: '11B', right: 'XXX' })
    expect(results[1]).toEqual({ origin: '22A', left: '22B', right: 'XXX' })
  })
})

describe('Find Starting Node', () => {
  it('should find', () => {
    const input =
      'BBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nAAA = (BBB, CCC)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)'
    const network = parseNetworkNodes(input)

    const result = findNode('AAA', network)
    expect(result).toEqual({ origin: 'AAA', left: 'BBB', right: 'CCC' })
  })
})

describe('Find Ending Node Steps', () => {
  it('should find from example', () => {
    const input =
      '11A = (11B, XXX)\n11B = (XXX, 11Z)\n11Z = (11B, XXX)\n22A = (22B, XXX)\n22B = (22C, 22C)\n22C = (22Z, 22Z)\n22Z = (22B, 22B)\nXXX = (XXX, XXX)'
    const network = parseNetworkNodes(input)
    const startingNodes = findAllNodesEndingWith('A', network)
    const instructions = ['L', 'R']
    const result = findEndingNodesStepsRequired(
      instructions,
      startingNodes,
      network
    )
    expect(result).toEqual([2, 3])
  })
})

describe('All notes end with Z', () => {
  it('should return false when all nodes dont end in Z', () => {
    const input =
      '11A = (11B, XXX)\n11B = (XXX, 11Z)\n11Z = (11B, XXX)\n22A = (22B, XXX)\n22B = (22C, 22C)\n22C = (22Z, 22Z)\n22Z = (22B, 22B)\nXXX = (XXX, XXX)'
    const nodes = parseNetworkNodes(input)

    expect(allNodesEndInZ(nodes)).toEqual(false)
  })
  it('should return true when all nodes end in Z', () => {
    const input =
      '11Z = (11B, XXX)\n11Z = (XXX, 11Z)\n11Z = (11B, XXX)\n22Z = (22B, XXX)\n22Z = (22C, 22C)\n22Z = (22Z, 22Z)\n22Z = (22B, 22B)\nXXZ = (XXX, XXX)'
    const nodes = parseNetworkNodes(input)
    expect(allNodesEndInZ(nodes)).toEqual(true)
  })
})

describe('Find Next Node Group', () => {
  it('', () => {
    const input =
      '11A = (11B, XXX)\n11B = (XXX, 11Z)\n11Z = (11B, XXX)\n22A = (22B, XXX)\n22B = (22C, 22C)\n22C = (22Z, 22Z)\n22Z = (22B, 22B)\nXXX = (XXX, XXX)'
    const network = parseNetworkNodes(input)
    const currentNodes: NetworkNode[] = [
      { origin: '11A', left: '11B', right: 'XXX' },
      { origin: '22A', left: '22B', right: 'XXX' },
    ]
    const results1 = findNextNodeGroup('L', currentNodes, network)
    expect(results1.length).toEqual(2)
    expect(results1[0].origin).toEqual('11B')
    expect(results1[1].origin).toEqual('22B')

    const results2 = findNextNodeGroup('R', results1, network)
    expect(results2.length).toEqual(2)
    expect(results2[0].origin).toEqual('11Z')
    expect(results2[1].origin).toEqual('22C')
  })
})

describe('Node Ends With', () => {
  it('returns true when ends with', () => {
    const node: NetworkNode = {
      origin: 'FSZ',
      left: '22D',
      right: '44E',
    }

    expect(nodeEndsWith('Z', node)).toEqual(true)
  })
})

describe('Get Instruction', () => {
  it('should cycle through instructions', () => {
    expect(getInstruction(0, ['L', 'R'])).toEqual('L')
    expect(getInstruction(1, ['L', 'R'])).toEqual('R')
    expect(getInstruction(2, ['L', 'R'])).toEqual('L')
    expect(getInstruction(2, ['A', 'B', 'C', 'D', 'E', 'F', 'G'])).toEqual('C')
    expect(getInstruction(20, ['A', 'B', 'C', 'D', 'E', 'F', 'G'])).toEqual('G')
  })
})
