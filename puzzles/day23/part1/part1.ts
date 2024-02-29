type MapValues = '.' | 'v' | '>' | '#'

type MapItem = {
  point: Point
  value: MapValues
}

export type Point = {
  x: number
  y: number
}

export const day23Part1 = (input: string) => {
  const randomHikeStep: number[] = []

  for (let i = 0; i < 50; i++) {
    const maze = new MazeMap(input)
    const current = new Current()
    while (current.hiking()) {
      const nextPoints = maze.findNextPoints(current.point())
      current.move(nextPoints)
    }
    randomHikeStep.push(current.steps())
  }

  return Math.max(...randomHikeStep)
}

export class MazeMap {
  lines: string[]

  constructor(input: string) {
    const lines = input.split('\n').filter((x) => !!x)
    this.lines = lines
  }

  getItem = (point: Point): MapValues | null => {
    if (!this.lines[point.y]) return null
    return this.lines[point.y][point.x] as MapValues
  }

  findNextPoints = (currentPoint: Point): MapItem[] => {
    const down = { ...currentPoint, y: currentPoint.y + 1 }
    const up = { ...currentPoint, y: currentPoint.y - 1 }
    const right = { ...currentPoint, x: currentPoint.x + 1 }
    const left = { ...currentPoint, x: currentPoint.x - 1 }
    return [down, up, right, left]
      .map((point) => {
        const value = this.getItem(point)
        if (value && value !== '#') return { value, point }
      })
      .filter((x) => x !== undefined) as MapItem[]
  }
}

export class Current {
  private pointHistory: Point[] = [{ x: 1, y: 0 }]
  private isHiking = true

  point = () => this.pointHistory[this.pointHistory.length - 1]
  move = (items: MapItem[]) => {
    const validNextMoves = this.findValidMoves(items)

    if (validNextMoves.length === 0) this.isHiking = false

    if (validNextMoves.length === 1) {
      const move = validNextMoves[0]
      this.pointHistory.push(move.point)
      this.skipWhenV(move)
      this.skipWhenRightArrow(move)
    }

    if (validNextMoves.length > 1) {
      const randomIndex = Math.floor(Math.random() * validNextMoves.length)
      const selectedMove = validNextMoves[randomIndex]
      this.pointHistory.push(selectedMove.point)
      this.skipWhenV(selectedMove)
      this.skipWhenRightArrow(selectedMove)
    }
  }

  hiking = () => this.isHiking
  steps = () => this.pointHistory.length - 1

  private findValidMoves = (items: MapItem[]) => {
    const validNextMoves: MapItem[] = []
    items.forEach((item) => {
      const existingItem = this.pointHistory.find(
        (point) => point.x === item.point.x && point.y === item.point.y
      )

      const isGoingUpOnV = item.value === 'v' && item.point.y < this.point().y

      const isGoingLeftOnRightArrow =
        item.value === '>' && item.point.x < this.point().x
      if (!existingItem && !isGoingUpOnV && !isGoingLeftOnRightArrow) {
        validNextMoves.push(item)
      }
    })
    return validNextMoves
  }

  private skipWhenV = (item: MapItem) => {
    if (item.value === 'v') {
      this.pointHistory.push({
        ...item.point,
        y: item.point.y + 1,
      })
    }
  }

  private skipWhenRightArrow = (item: MapItem) => {
    if (item.value === '>') {
      this.pointHistory.push({
        ...item.point,
        x: item.point.x + 1,
      })
    }
  }
}
