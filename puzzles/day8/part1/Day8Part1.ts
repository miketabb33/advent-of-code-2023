import { parseNetworkNodes } from './parseNetworkNodes'
import { findEndingNodeStepsRequired, findNode } from './processNetwork'

export const Day8Part1 = (input: string) => {
  const instructionsAndNetworkRaw = input.split('\n\n')
  const instructions = instructionsAndNetworkRaw[0].trim().split('')

  const network = parseNetworkNodes(instructionsAndNetworkRaw[1])
  const startingNode = findNode('AAA', network)

  return findEndingNodeStepsRequired(instructions, startingNode, network)
}
