import { writeFileSync } from 'fs'

type Direction = 'up' | 'right' | 'down' | 'left'
type Position = { x: number; y: number }

type Frame = {
  position: Position
  value: string
}

type Box = {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

type DigPlanItem = {
  direction: Direction
  meters: number
  color: string
}

export class DigMap {
  private currentDigMap: Position[] = []
  private box: Box = { minX: 0, minY: 0, maxX: 0, maxY: 0 }

  static make = (digPlan: DigPlanItem[]) => {
    const digMap = new DigMap()
    digPlan.forEach((item) => DigMap.processDigPlanItem(item, digMap))
    digMap.box = digMap.calculateBox()
    return digMap
  }

  static processDigPlanItem = (item: DigPlanItem, digMap: DigMap) => {
    for (let i = 0; i < item.meters; i++) {
      digMap.push(DigMap.getNextPosition(item.direction, digMap.current()))
    }
  }

  static getNextPosition = (direction: Direction, lastPosition: Position) => {
    if (!lastPosition) return { x: 0, y: 0 }
    if (direction === 'right')
      return { x: lastPosition.x + 1, y: lastPosition.y }
    if (direction === 'down')
      return { x: lastPosition.x, y: lastPosition.y + 1 }
    if (direction === 'left')
      return { x: lastPosition.x - 1, y: lastPosition.y }
    if (direction === 'up') return { x: lastPosition.x, y: lastPosition.y - 1 }
    throw new Error('unsupported direction: "' + direction + '"')
  }

  getMap = () => this.currentDigMap
  getBox = () => this.box

  getBlankMatrix = () => {
    const matrix: Frame[][] = []
    let row = 0
    let currentY = this.box.minY
    const height = Math.abs(this.box.minY) + Math.abs(this.box.maxY)
    while (row <= height) {
      matrix[row] = []
      for (let i = this.box.minX; i <= this.box.maxX; i++) {
        matrix[row].push({ position: { x: i, y: currentY }, value: '.' })
      }
      row++
      currentY++
    }

    return matrix
  }

  getDigPlanMatrix = () => {
    const matrix = this.getBlankMatrix()
    const rows = matrix.map((f) => f.map((f) => f.position.y)[0])

    this.currentDigMap.forEach((item) => {
      const row = rows.findIndex((x) => x === item.y)
      const i = matrix[row].findIndex((x) => x.position.x === item.x)
      matrix[row][i].value = '#'
    })
    return matrix
  }

  print = (matrix: Frame[][]) => {
    const lines: string[] = []

    matrix.forEach((frames) => {
      let line = ''
      frames.forEach((frame) => {
        line += frame.value
      })
      lines.push(line)
    })
    return lines
  }

  private current = () => this.currentDigMap[this.currentDigMap.length - 1]
  private push = (position: Position) => this.currentDigMap.push(position)

  private calculateBox(): Box {
    let minX = 0
    let minY = 0
    let maxX = 0
    let maxY = 0

    this.currentDigMap.forEach((p) => {
      if (p.x < minX) minX = p.x
      if (p.y < minY) minY = p.y
      if (p.x > maxX) maxX = p.x
      if (p.y > maxY) maxY = p.y
    })

    return { minX, minY, maxX, maxY }
  }
}

export const day18Part1 = (input: string) => {
  const lines = input.split('\n').filter((x) => !!x)
  const digPlan = parseDigPlans(lines)
  const digMap = DigMap.make(digPlan)
  const printed = digMap.print(digMap.getDigPlanMatrix())

  writeFileSync(`${__dirname}/../printed`, printed.join('\n'))
  return ''
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
