import { parseNetworkNodes } from '../part1/parseNetworkNodes'
import {
  findAllNodesEndingWith,
  findEndingNodesStepsRequired,
} from './processNetwork'

export const Day8Part2 = (input: string) => {
  const instructionsAndNetworkRaw = input.split('\n\n')
  const instructions = instructionsAndNetworkRaw[0].trim().split('')

  const network = parseNetworkNodes(instructionsAndNetworkRaw[1])
  const startingNodes = findAllNodesEndingWith('A', network)

  return findEndingNodesStepsRequired(instructions, startingNodes, network)
}
