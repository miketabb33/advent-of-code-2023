import { NetworkNode } from './types'

export const findNode = (origin: string, nodes: NetworkNode[]): NetworkNode => {
  const result = nodes.find((node) => node.origin === origin)
  if (!result) throw new Error('Starting node not found')
  return result
}

export const findEndingNodeStepsRequired = (
  instructions: string[],
  startingNode: NetworkNode,
  network: NetworkNode[]
): number => {
  let foundEnd = false
  let currentNode = startingNode
  let steps = 0
  while (!foundEnd) {
    const currentInstruction = instructions[steps]
    currentNode = findNextNode(currentInstruction, currentNode, network)
    if (isLastNode(currentNode) && isLastInstruction(instructions, steps))
      foundEnd = true
    steps++
  }

  return steps
}

export const isLastInstruction = (instructions: string[], step: number) => {
  const distanceFromEnd = (step + 1) % instructions.length
  return distanceFromEnd === 0
}

const findNextNode = (
  instruction: string,
  currentNode: NetworkNode,
  network: NetworkNode[]
) => {
  if (instruction === 'L') return findNode(currentNode.left, network)
  else return findNode(currentNode.right, network)
}

const isLastNode = (node: NetworkNode) => node.origin === 'ZZZ'
