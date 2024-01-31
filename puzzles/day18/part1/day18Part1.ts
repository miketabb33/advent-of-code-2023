type Direction = 'up' | 'right' | 'down' | 'left'
type Position = { x: number; y: number }

type DigPlanItem = {
  direction: Direction
  meters: number
  color: string
}

class DigMap {
  private currentDigMap: Position[] = []
  current = () => this.currentDigMap[this.currentDigMap.length - 1]
  push = (position: Position) => this.currentDigMap.push(position)
  getMap = () => this.currentDigMap
}

export const day18Part1 = (input: string) => {
  const lines = input.split('\n').filter((x) => !!x)
  const digPlan = parseDigPlans(lines)
  const digMap = createDigMap(digPlan)
  return `Ready, solve that puzzle! Input: ${lines}`
}

export const parseDigPlans = (lines: string[]): DigPlanItem[] => {
  const map = new Map<string, Direction>([
    ['U', 'up'],
    ['R', 'right'],
    ['D', 'down'],
    ['L', 'left'],
  ])
  return lines.map((line) => {
    const parts = line.split(' ')
    return {
      direction: map.get(parts[0]) || 'down',
      meters: +parts[1],
      color: parts[2],
    }
  })
}

export const createDigMap = (digPlan: DigPlanItem[]): Position[] => {
  const digMap = new DigMap()
  digPlan.forEach((item) => processDigPlanItem(item, digMap))

  return digMap.getMap()
}

const processDigPlanItem = (item: DigPlanItem, digMap: DigMap) => {
  for (let i = 0; i < item.meters; i++) {
    digMap.push(getNextPosition(item.direction, digMap.current()))
  }
}

const getNextPosition = (direction: Direction, lastPosition: Position) => {
  if (!lastPosition) return { x: 0, y: 0 }
  if (direction === 'right') return { x: lastPosition.x + 1, y: lastPosition.y }
  if (direction === 'down') return { x: lastPosition.x, y: lastPosition.y + 1 }
  if (direction === 'left') return { x: lastPosition.x - 1, y: lastPosition.y }
  if (direction === 'up') return { x: lastPosition.x, y: lastPosition.y - 1 }
  throw new Error('unsupported direction: "' + direction + '"')
}
