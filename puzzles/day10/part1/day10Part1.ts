import { findNextTile } from './findNextTile'
import { parsePipeMaze } from './parsePipeMaze'
import { PipeMazeRow, PipeResult } from './type'

export const day10Part1 = (input: string) => {
  const loop: PipeResult[] = []
  const maze = parsePipeMaze(input)
  const startingTile = findSTile(maze)
  loop.push(startingTile)

  let iterating = true

  while (iterating) {
    const lastTile = loop.at(-1)!
    const nextTile = findNextTile(lastTile, maze)

    if (isSTile(nextTile)) {
      iterating = false
    } else {
      loop.push(nextTile)
    }
  }

  return loop.length / 2
}

export const isSTile = (lastResult: PipeResult) => lastResult.tile.pipe === 'S'

export const findSTile = (rows: PipeMazeRow[]): PipeResult => {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    for (let j = 0; j < row.tiles.length; j++) {
      const tile = row.tiles[j]

      if (tile.pipe === 'S') {
        const result: PipeResult = {
          direction: 'east',
          position: {
            rowIndex: i,
            tileIndex: j,
          },
          tile: {
            index: j,
            pipe: tile.pipe,
          },
        }
        return result
      }
    }
  }
  throw new Error('Could not find starting tile: "S"')
}
