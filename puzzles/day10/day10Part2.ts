import { writeFileSync } from 'fs'
import { findSTile, isSTile } from './part1/day10Part1'
import { findNextTile } from './part1/findNextTile'
import { parsePipeMaze } from './part1/parsePipeMaze'
import { PipeResult, TilePosition } from './part1/type'

type RowView = {
  rowIndex: number
  tiles: TileView[]
}

type TileView = {
  tileIndex: number
  isMaze: boolean
}

const html = (matrix: RowView[]) => {
  const tileOff = (rowId: number, tileId: number) =>
    `<div id="${rowId}:${tileId}" style="background-color: lightblue; border: 0.25px grey solid; height: 100%; width: 100%; cursor: pointer;" onclick="myFunction(event);"></div>`

  const tileOn = `<div style="background-color: green; border: 0.25px grey solid; height: 100%; width: 100%;"></div>`

  const rows = matrix
    .map((row, rowId) => {
      const tiles = row.tiles
        .map((tile, tileId) => (tile.isMaze ? tileOn : tileOff(rowId, tileId)))
        .join('')
      return `<div style="display:flex; justify-content: space-evenly; height: 100%; width: 100%;">${tiles}</div>`
    })
    .join('')

  const container = `<div style="width: 100vw; height: 100vh; background-color: lightblue; display: flex; flex-direction: column">${rows}</div>`
  return `<!DOCTYPE html>\n<html>\n<body style="margin:0; padding:0">\n${container}\n</body>\n<script>
  let count = 0
  function myFunction(e) {

    const tile = document.getElementById(e.target.id)
    tile.style.backgroundColor = "red";
    tile.style.pointerEvents = "none";
    count++
    console.log(count)
  }
  </script></html>`
}

export const day10Part2 = (input: string) => {
  const loop = getLoop(input)

  const positions = loop.map((x) => x.position)

  const matrix = makeMatrix()

  positions.forEach((pos) => {
    const target = matrix
      .find((row) => row.rowIndex === pos.rowIndex)
      ?.tiles.find((tile) => tile.tileIndex === pos.tileIndex)
    target!.isMaze = true
  })

  writeFileSync(`${__dirname}/visualizer.html`, html(matrix))
}

const makeMatrix = (): RowView[] => {
  return [...Array(140).keys()].map((_, i) => {
    const tiles = [...Array(140).keys()].map((_, i) => {
      return {
        tileIndex: i,
        isMaze: false,
      }
    })
    return { rowIndex: i, tiles }
  })
}

const getLoop = (input: string) => {
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

  return loop
}

//To High
//556
//520
//420

//Unknown
//419

//320
