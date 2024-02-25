type Position = {
  x: number
  y: number
}

type Coordinate = {
  x: number
  y: number
  z: number
}

type Brick = {
  id: number
  type: 'row' | 'column' | 'vertical'
  coord1: Coordinate
  coord2: Coordinate
}

type BrickParseResults = {
  bricks: Brick[]
  size: number
}

export const day22Part1 = (input: string): number => {
  const lines = input.split('\n').filter((x) => !!x)
  const parsedBricks = parseBrickInput(lines)
  const settledBricks = dropBricks(parsedBricks)

  const maxZCoord1 = Math.max(...settledBricks.map((brick) => brick.coord1.z))
  const maxZCoord2 = Math.max(...settledBricks.map((brick) => brick.coord2.z))
  const maxZ = Math.max(maxZCoord1, maxZCoord2)

  let disintegratedBricks = 0

  for (let currentZ = 1; currentZ <= maxZ; currentZ++) {
    const brickLayer = settledBricks.filter(
      (brick) => brick.coord1.z === currentZ || brick.coord2.z === currentZ
    )

    if (brickLayer.length !== 1 && currentZ !== maxZ) {
      disintegratedBricks += brickLayer.length
    }

    if (currentZ === maxZ) {
      disintegratedBricks += brickLayer.length
    }
  }

  return disintegratedBricks
}

export const dropBricks = (parsedBricks: BrickParseResults) => {
  const stackTopography = initTopography(parsedBricks.size)

  return parsedBricks.bricks.map((brick) => {
    const brickTopDownPositions = getBrickTopDown(brick)
    const droppableZIndex = findDroppableZIndex(
      brickTopDownPositions,
      stackTopography
    )

    const dropDistance = brick.coord1.z - droppableZIndex

    const newBrick: Brick = {
      id: brick.id,
      type: brick.type,
      coord1: { ...brick.coord1, z: brick.coord1.z - dropDistance },
      coord2: { ...brick.coord2, z: brick.coord2.z - dropDistance },
    }

    const brickCoords = getBrickCoordinates(newBrick)

    brickCoords.forEach((coord) => {
      stackTopography.find((item) => {
        if (item.x === coord.x && item.y === coord.y) {
          item.z = coord.z
          return true
        }
      })
    })

    return newBrick
  })
}

const findDroppableZIndex = (
  brickTopDownPositions: Position[],
  stackTopography: Coordinate[]
) => {
  const overlay: Coordinate[] = []
  brickTopDownPositions.forEach((position) => {
    const topographyPosition = stackTopography.find((item) => {
      return item.x === position.x && item.y === position.y
    })
    if (!topographyPosition) throw new Error('Error 1014')
    overlay.push(topographyPosition)
  })

  return Math.max(...overlay.map((item) => item.z)) + 1
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

export const getBrickTopDown = (brick: Brick): Position[] => {
  const positions: Position[] = []

  if (brick.type === 'column') {
    const x = brick.coord1.x
    const startY = brick.coord1.y
    const endY = brick.coord2.y
    for (let i = startY; i <= endY; i++) {
      positions.push({ x, y: i })
    }
  } else {
    const y = brick.coord1.y
    const startX = brick.coord1.x
    const endX = brick.coord2.x
    for (let i = startX; i <= endX; i++) {
      positions.push({ x: i, y })
    }
  }
  return positions
}

export const getBrickCoordinates = (brick: Brick): Coordinate[] => {
  const coordinates: Coordinate[] = []

  if (brick.type === 'vertical') {
    const x = brick.coord1.x
    const y = brick.coord1.y
    const startZ = brick.coord1.z
    const endZ = brick.coord2.z
    for (let i = startZ; i <= endZ; i++) {
      coordinates.push({ x, y, z: i })
    }
  } else if (brick.type === 'column') {
    const x = brick.coord1.x
    const z = brick.coord1.z
    const startY = brick.coord1.y
    const endY = brick.coord2.y
    for (let i = startY; i <= endY; i++) {
      coordinates.push({ x, y: i, z })
    }
  } else if (brick.type === 'row') {
    const y = brick.coord1.y
    const z = brick.coord1.z
    const startX = brick.coord1.x
    const endX = brick.coord2.x
    for (let i = startX; i <= endX; i++) {
      coordinates.push({ x: i, y, z })
    }
  } else {
    throw new Error('Error 1023')
  }
  return coordinates
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
    const isColumn = coords[0].x === coords[1].x
    const isRow = coords[0].y === coords[1].y
    const type = isRow && isColumn ? 'vertical' : isColumn ? 'column' : 'row'
    const brick: Brick = { id: i, coord1: coords[0], coord2: coords[1], type }
    return brick
  })

  return { bricks, size }
}

const getMaxXY = (coord1: string[], coord2: string[]): number => {
  return Math.max(+coord1[0], +coord1[1], +coord2[0], +coord2[1])
}
