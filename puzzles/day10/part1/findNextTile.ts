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
  }

  if (lastDirection === 'south') {
    if (nextTile === '|') return 'south'
    if (nextTile === 'J') return 'west'
  }

  if (lastDirection === 'west') {
    if (nextTile === '-') return 'west'
    if (nextTile === 'L') return 'north'
  }

  if (lastDirection === 'north') {
    if (nextTile === '|') return 'north'
  }

  throw new Error('direction not calculated')
}

const findTileWithPosition = (position: TilePosition, maze: PipeMazeRow[]) => {
  const nextTile = maze
    .find((x) => x.index === position.rowIndex)
    ?.tiles.find((x) => x.index === position.tileIndex)

  if (!nextTile) throw new Error('Tile not found')
  return nextTile
}

const findNextTilePosition = (lastResult: PipeResult) => {
  const lastPos = lastResult.position
  const lastTile = lastResult.tile.pipe
  const lastDir = lastResult.direction

  const pos: TilePosition = { rowIndex: -1, tileIndex: -1 }

  if (lastTile === 'S' || lastTile === '-') {
    pos.rowIndex = lastPos.rowIndex
    if (lastDir === 'east') pos.tileIndex = lastPos.tileIndex + 1
    if (lastDir === 'west') pos.tileIndex = lastPos.tileIndex - 1
  }

  if (lastTile === '7') {
    if (lastDir === 'south') {
      pos.rowIndex = lastPos.rowIndex + 1
      pos.tileIndex = lastPos.tileIndex
    }
  }

  if (lastTile === '|') {
    pos.tileIndex = lastPos.tileIndex
    if (lastDir === 'south') pos.rowIndex = lastPos.rowIndex + 1
    if (lastDir === 'north') pos.rowIndex = lastPos.rowIndex - 1
  }

  if (lastTile === 'J') {
    if (lastDir === 'west') {
      pos.rowIndex = lastPos.rowIndex
      pos.tileIndex = lastPos.tileIndex - 1
    }
  }

  if (lastTile === 'L') {
    if (lastDir === 'north') {
      pos.rowIndex = lastPos.rowIndex - 1
      pos.tileIndex = lastPos.tileIndex
    }
  }

  if (pos.rowIndex === -1 || pos.tileIndex === -1)
    throw new Error(`Failed to get a valid position.\n${lastTile}\n${lastDir}`)
  return pos
}
