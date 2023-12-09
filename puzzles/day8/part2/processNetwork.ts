import { NetworkNode } from '../part1/types'

type NodeLoop = {
  index: number
  loopStart: number
  startingValue: string
  loopLength: number
}

export const findAllNodesEndingWith = (
  letter: string,
  nodes: NetworkNode[]
): NetworkNode[] => nodes.filter((node) => nodeEndsWith(letter, node))

export const findEndingNodesStepsRequired = (
  instructions: string[],
  startingNodes: NetworkNode[],
  network: NetworkNode[]
): number[] => {
  let foundEnd = false
  let currentNodes = startingNodes
  let steps = 0

  let loops: NodeLoop[] = currentNodes.map((_, i) => {
    return {
      index: i,
      loopStart: -1,
      startingValue: startingNodes[i].origin,
      loopLength: -1,
    }
  })

  while (!foundEnd) {
    const currentInstruction = getInstruction(steps, instructions)
    currentNodes = findNextNodeGroup(currentInstruction, currentNodes, network)
    foundEnd = allNodesEndInZ(currentNodes)

    currentNodes.forEach((node, i) => {
      if (nodeEndsWith('Z', node)) {
        if (loops[i].loopStart === -1) {
          // Mark beginning of loop
          loops[i].loopStart = steps
        } else if (loops[i].loopLength === -1) {
          // Mark end of loop
          loops[i].loopLength = steps
        }
      }
    })

    if (hasIteratedThroughAllLoops(loops)) foundEnd = true

    steps++
  }

  return loops.map((x) => x.loopLength - x.loopStart)
}

const hasIteratedThroughAllLoops = (loops: NodeLoop[]) =>
  loops.filter((x) => x.loopLength === -1).length === 0

export const allNodesEndInZ = (nodes: NetworkNode[]): boolean => {
  for (let i = 0; i < nodes.length; i++) {
    if (!nodeEndsWith('Z', nodes[i])) return false
  }
  return true
}

export const findNextNodeGroup = (
  instruction: string,
  nodes: NetworkNode[],
  network: NetworkNode[]
) => nodes.map((node) => findNextNode(instruction, node, network))

const findNextNode = (
  instruction: string,
  currentNode: NetworkNode,
  network: NetworkNode[]
) => {
  if (instruction === 'L') return findNode(currentNode.left, network)
  else return findNode(currentNode.right, network)
}

export const findNode = (origin: string, nodes: NetworkNode[]): NetworkNode => {
  const result = nodes.find((node) => node.origin === origin)
  if (!result) throw new Error('Starting node not found')
  return result
}

export const nodeEndsWith = (letter: string, node: NetworkNode) =>
  node.origin[node.origin.length - 1] === letter

export const getInstruction = (steps: number, instructions: string[]) => {
  const index = steps % instructions.length
  return instructions[index]
}
