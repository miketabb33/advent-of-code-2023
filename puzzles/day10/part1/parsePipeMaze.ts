import { Pipe, PipeMazeRow, PipeMazeTile } from './type'

export const parsePipeMaze = (input: string): PipeMazeRow[] => {
  const lines = input.split('\n').filter((x) => !!x)

  return lines.map((line, i) => {
    const pipes = line.split('')

    const row: PipeMazeRow = {
      index: i,
      tiles: pipes.map(buildTile),
    }

    return row
  })
}

const buildTile = (pipe: string, index: number): PipeMazeTile => {
  if (!/[|\-.S7FLJ]/gm.test(pipe))
    throw new Error(`${pipe} is not a valid pipe`)

  const tile: PipeMazeTile = {
    pipe: pipe as Pipe,
    index,
  }

  return tile
}
