type Coordinate = {
  x: number
  y: number
  z: number
}

type Brick = {
  id: number
  coord1: Coordinate
  coord2: Coordinate
}

type BrickParseResults = {
  bricks: Brick[]
  size: number
}

export const starter = (input: string) => {
  const lines = input.split('\n').filter((x) => !!x)
  const parsedBricks = parseBrickInput(lines)
  const settledBricks = dropBricks(parsedBricks)

  return []
}

export const dropBricks = (parsedBricks: BrickParseResults) => {
  const bricks = parsedBricks.bricks
  const stackTopography = initTopography(parsedBricks.size)
  const stack: Brick[] = []

  // using the topography and current block, check if the current block can drop
  // if it can, update the blocks z indexes to the new dropped position
  // finally, update the topography to include the current blocks topography

  console.log(bricks[0])

  console.log(stackTopography)
}

const initTopography = (size: number) => {
  const stackTopography: Coordinate[] = []
  for (let i = 0; i <= size; i++) {
    for (let j = 0; j <= size; j++) {
      stackTopography.push({ x: j, y: i, z: 0 })
    }
  }
  return stackTopography
}

export const parseBrickInput = (lines: string[]): BrickParseResults => {
  let size = 0

  const bricksCoords = lines.map((line) => {
    const oneAndTwo = line.split('~')
    const coord1 = oneAndTwo[0].split(',')
    const coord2 = oneAndTwo[1].split(',')

    const maxXY = getMaxXY(coord1, coord2)
    if (size < maxXY) size = maxXY

    const brick: [Coordinate, Coordinate] = [
      { x: +coord1[0], y: +coord1[1], z: +coord1[2] },
      { x: +coord2[0], y: +coord2[1], z: +coord2[2] },
    ]
    return brick
  })
  const sortedBrickCoords = bricksCoords.sort((a, b) => a[0].z - b[0].z)
  const bricks = sortedBrickCoords.map((coords, i) => {
    const brick: Brick = { id: i, coord1: coords[0], coord2: coords[1] }
    return brick
  })

  return { bricks, size }
}

const getMaxXY = (coord1: string[], coord2: string[]): number => {
  return Math.max(+coord1[0], +coord1[1], +coord2[0], +coord2[1])
}
