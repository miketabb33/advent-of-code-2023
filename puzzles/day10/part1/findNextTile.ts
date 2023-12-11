import {
  Pipe,
  PipeDirection,
  PipeMazeRow,
  PipeResult,
  TilePosition,
} from './type'

export const findNextTile = (
  lastResult: PipeResult,
  maze: PipeMazeRow[]
): PipeResult => {
  const newPosition = findNextTilePosition(lastResult)
  const newTile = findTileWithPosition(newPosition, maze)

  return {
    position: newPosition,
    tile: newTile,
    direction: findNewDirection(lastResult.direction, newTile.pipe),
  }
}

const findNewDirection = (
  lastDirection: PipeDirection,
  nextTile: Pipe
): PipeDirection => {
  if (nextTile === 'S') return 'north'

  if (lastDirection === 'east') {
    if (nextTile === '-') return 'east'
    if (nextTile === '7') return 'south'
    if (nextTile === 'J') return 'north'
    if (nextTile === 'L') return 'north'
  }

  if (lastDirection === 'south') {
    if (nextTile === '|') return 'south'
    if (nextTile === 'J') return 'west'
    if (nextTile === 'L') return 'east'
  }

  if (lastDirection === 'west') {
    if (nextTile === '-') return 'west'
    if (nextTile === 'L') return 'north'
    if (nextTile === 'F') return 'south'
  }

  if (lastDirection === 'north') {
    if (nextTile === '|') return 'north'
    if (nextTile === 'F') return 'east'
    if (nextTile === '7') return 'west'
  }

  throw new Error(`direction not calculated\n${nextTile}\n${lastDirection}`)
}

const findTileWithPosition = (position: TilePosition, maze: PipeMazeRow[]) => {
  const nextTile = maze
    .find((x) => x.index === position.rowIndex)
    ?.tiles.find((x) => x.index === position.tileIndex)

  if (!nextTile) throw new Error('Tile not found')
  return nextTile
}

const findNextTilePosition = (lastResult: PipeResult) => {
  const lastDir = lastResult.direction

  if (lastDir === 'east') return moveEast(lastResult)
  if (lastDir === 'west') return moveWest(lastResult)
  if (lastDir === 'south') return moveSouth(lastResult)
  if (lastDir === 'north') return moveNorth(lastResult)

  throw new Error(
    `Failed to get a valid position.\n${lastResult.tile.pipe}\n${lastDir}`
  )
}

const moveNorth = (lastResult: PipeResult): TilePosition => {
  const lastPos = lastResult.position
  return {
    rowIndex: lastPos.rowIndex - 1,
    tileIndex: lastPos.tileIndex,
  }
}

const moveSouth = (lastResult: PipeResult): TilePosition => {
  const lastPos = lastResult.position
  return {
    rowIndex: lastPos.rowIndex + 1,
    tileIndex: lastPos.tileIndex,
  }
}

const moveEast = (lastResult: PipeResult): TilePosition => {
  const lastPos = lastResult.position
  return {
    rowIndex: lastPos.rowIndex,
    tileIndex: lastPos.tileIndex + 1,
  }
}

const moveWest = (lastResult: PipeResult): TilePosition => {
  const lastPos = lastResult.position
  return {
    rowIndex: lastPos.rowIndex,
    tileIndex: lastPos.tileIndex - 1,
  }
}
