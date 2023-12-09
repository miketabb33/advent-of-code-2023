import { NetworkNode } from '../part1/types'

type NodeLCM = {
  index: number
  steps: number
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
): number => {
  let foundEnd = false
  let currentNodes = startingNodes
  let steps = 0

  let lcm: NodeLCM[] = currentNodes.map((_, i) => {
    return {
      index: i,
      steps: -1,
      startingValue: startingNodes[i].origin,
      loopLength: -1,
    }
  })

  while (!foundEnd) {
    const currentInstruction = getInstruction(steps, instructions)
    currentNodes = findNextNodeGroup(currentInstruction, currentNodes, network)
    foundEnd = allNodesEndInZ(currentNodes)

    // TAKING A STAB AT LCM APPROACH
    // if (steps % 50_000 === 0 && steps > 1) console.log(steps)

    // currentNodes.forEach((node, i) => {
    //   // Sets how many steps until a cycle reaches the end.
    //   if (nodeEndsWith('Z', node) && lcm[i].steps === -1) {
    //     lcm[i].steps = steps
    //   }

    //   if (i > 0 && lcm[i].startingValue === node.origin) {
    //     lcm[i].loopLength = steps
    //   }
    // })

    // // Stops the Loop once all steps have been set
    // if (lcm.filter((x) => x.steps === -1).length === 0) foundEnd = true

    steps++
  }

  return steps
}

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
