import { writeFileSync } from 'fs'
import { findSTile, isSTile } from './part1/day10Part1'
import { findNextTile } from './part1/findNextTile'
import { parsePipeMaze } from './part1/parsePipeMaze'
import { PipeResult } from './part1/type'

const html = (i: string) => {
  const square =
    '<div style="background-color: lightblue; border: 0.25px grey solid; height: 100%; width: 100%;"></div>'

  const squares = [...Array(140).keys()].map(() => square).join('')
  const row = `<div style="display:flex; justify-content: space-evenly; height: 100%; width: 100%;">${squares}</div>`

  const rows = [...Array(140).keys()].map(() => row).join('')
  const container = `<div style="width: 100vw; height: 100vh; background-color: lightblue; display: flex; flex-direction: column">${rows}</div>`
  return `<!DOCTYPE html>\n<html>\n<body style="margin:0; padding:0">\n${container}\n</body>\n</html>`
}

export const day10Part2 = (input: string) => {
  const loop = getLoop(input)

  const positions = loop.map((x) => x.position)

  writeFileSync(`${__dirname}/visualizer.html`, html('sup'))
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
