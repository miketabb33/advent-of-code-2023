export type Pipe = '|' | '-' | 'L' | 'J' | '7' | 'F' | '.' | 'S'
export type PipeDirection = 'east' | 'south' | 'west' | 'north'

export type PipeResult = {
  position: TilePosition
  tile: PipeMazeTile
  direction: PipeDirection
}

export type TilePosition = {
  rowIndex: number
  tileIndex: number
}

export type PipeMazeTile = {
  index: number
  pipe: Pipe
}

export type PipeMazeRow = {
  index: number
  tiles: PipeMazeTile[]
}
