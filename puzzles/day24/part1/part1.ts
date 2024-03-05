type Position = {
  x: number
  y: number
  z: number
}

type Velocity = {
  x: number
  y: number
  z: number
}

type IntersectionResult = {
  x: number
  y: number
}

type Motion = {
  position: Position
  velocity: Velocity
}

type LinearEquation = {
  a: number
  b: number
  c: number
}

export class HailStone {
  private trajectory: Motion[] = []

  constructor(line: string) {
    const startingMotion = HailStone.parseLine(line)
    this.trajectory.push(startingMotion)
  }

  static parseLine = (line: string): Motion => {
    const posAndVel = line.split('@')
    const posParams = posAndVel[0].split(',').map((x) => +x.trim())
    const velParams = posAndVel[1].split(',').map((x) => +x.trim())
    const position = { x: posParams[0], y: posParams[1], z: posParams[2] }
    const velocity = { x: velParams[0], y: velParams[1], z: velParams[2] }
    return { position, velocity }
  }

  getLastMotion = () => this.trajectory[this.trajectory.length - 1]
}

export const findIntersection = (
  motion1: Motion,
  motion2: Motion
): IntersectionResult => {
  const l1 = getLinearEquation(motion1)
  const l2 = getLinearEquation(motion2)

  const x = (l1.b * l2.c - l2.b * l1.c) / (l1.a * l2.b - l2.a * l1.b)
  const y = (l1.c * l2.a - l2.c * l1.a) / (l1.a * l2.b - l2.a * l1.b)
  return { x: +x.toFixed(3), y: +y.toFixed(3) }
}

const getLinearEquation = (motion: Motion): LinearEquation => {
  const slope1 = motion.velocity.y / motion.velocity.x
  const a = slope1 * -1
  const b = 1
  const c = (slope1 * -motion.position.x + motion.position.y) * -1
  return { a, b, c }
}

const findIntersections = (hailStones: HailStone[]) => {
  const intersections: IntersectionResult[] = []
  for (let i = 0; i < hailStones.length; i++) {
    for (let j = i; j < hailStones.length; j++) {
      const hailStone1 = hailStones[i]
      const hailStone2 = hailStones[j + 1]
      if (!hailStone2) break

      const intersection = findIntersection(
        hailStone1.getLastMotion(),
        hailStone2.getLastMotion()
      )
      intersections.push(intersection)
    }
  }
  return intersections
}

export const day24Part1 = (input: string, min: number, max: number) => {
  const lines = input.split('\n').filter((x) => !!x)
  const hailStones = lines.map((line) => new HailStone(line))

  const intersections = findIntersections(hailStones)

  let count = 0

  intersections.forEach((intersection) => {
    const isXInRange = intersection.x >= min && intersection.x <= max
    const isYInRange = intersection.y >= min && intersection.y <= max

    if (isXInRange && isYInRange) count++
  })

  return count
}
