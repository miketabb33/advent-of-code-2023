import { v4 as uuidv4 } from 'uuid'

type Vector = {
  direction: Direction
  position: Position
}

type Position = {
  x: number
  y: number
}

export type Direction = 'left' | 'right' | 'up' | 'down'

const runBeams = (lines: string[], vector: Vector, limit: number) => {
  const energizedTiles = new EnergizedTiles()
  const beamGroup = new BeamGroup([
    new Beam(vector.position, vector.direction, lines),
  ])
  let i = 0
  while (i < limit) {
    frameBeam(beamGroup, energizedTiles)
    i++
  }
  return energizedTiles.count()
}

export const day16Part2 = (input: string) => {
  const lines = input.split('\n').filter((x) => !!x)

  const results: number[] = []

  results.push(
    runBeams(lines, { position: { x: 0, y: 0 }, direction: 'right' }, 550)
  ) //6978 - Good

  results.push(
    runBeams(
      lines,
      { position: { x: 0, y: lines.length - 1 }, direction: 'right' },
      1000
    )
  ) // 47 - Good

  results.push(
    runBeams(
      lines,
      { position: { x: 0, y: lines.length - 1 }, direction: 'up' },
      1000
    )
  ) // 15 - Good

  results.push(
    runBeams(
      lines,
      { position: { x: lines[0].length - 1, y: 0 }, direction: 'left' },
      1000
    )
  ) // 3 - Good

  results.push(
    runBeams(
      lines,
      {
        position: { x: lines[0].length - 1, y: lines.length - 1 },
        direction: 'left',
      },
      1000
    )
  ) // 2 - Good

  results.push(
    runBeams(
      lines,
      {
        position: { x: lines[0].length - 1, y: lines.length - 1 },
        direction: 'up',
      },
      1000
    )
  ) // 76 - Good

  results.push(
    runBeams(
      lines,
      { position: { x: lines[0].length - 1, y: 0 }, direction: 'down' },
      500
    )
  ) // 7000

  results.push(
    runBeams(lines, { position: { x: 0, y: 0 }, direction: 'down' }, 500)
  ) //6975

  return Math.max(...results)
}

export const frameBeam = (
  beamGroup: BeamGroup,
  energizedTiles: EnergizedTiles
) => {
  beamGroup.clearInvalid()
  beamGroup.addEnergizedTiles(energizedTiles)
  beamGroup.updateDirections()
  beamGroup.move()
}

export class BeamGroup {
  private beams: Beam[]
  private splitCache: Vector[] = []

  constructor(initBeams: Beam[]) {
    this.beams = initBeams
  }

  getBeams() {
    return this.beams
  }

  isEmpty() {
    return this.beams.length === 0
  }

  clearInvalid() {
    this.beams = this.beams.filter((beam) => beam.isValid())
  }

  move() {
    this.beams.forEach((beam) => beam.move())
  }

  addEnergizedTiles(energizedTiles: EnergizedTiles) {
    this.beams.forEach((beam) => energizedTiles.add(beam.getPosition()))
  }

  updateDirections() {
    const beamCache: Beam[] = []
    this.beams.forEach((beam) => {
      const result = beam.updateDirectionAndGetSplitWhenAvailable()
      if (result) {
        if (!this.isInSplitCache(result.newBeam)) beamCache.push(result.newBeam)
        else {
          const i = this.beams.findIndex(
            (beam) => beam.id === result.originalBeamId
          )
          this.beams.splice(i, 1)
        }
      }
    })
    beamCache.forEach((cacheItem) => this.beams.push(cacheItem))
  }

  private isInSplitCache(beam: Beam) {
    return !!this.splitCache.find((cache) => {
      return (
        cache.direction === beam.getDirection() &&
        cache.position.x === beam.getPosition().x &&
        cache.position.y === beam.getPosition().y
      )
    })
  }
}

type UpdateDirectionResult = {
  newBeam: Beam
  originalBeamId: string
}
export class Beam {
  readonly id = uuidv4()
  private position: Position
  private direction: Direction
  private lines: string[]

  constructor(
    initPosition: Position,
    initDirection: Direction,
    lines: string[]
  ) {
    this.position = initPosition
    this.direction = initDirection
    this.lines = lines
  }

  isValid() {
    return !!this._getTile()
  }

  updateDirectionAndGetSplitWhenAvailable(): UpdateDirectionResult | undefined {
    const tile = this._getTile()
    if (tile === '.') return
    if (tile === '\\') {
      if (this.direction === 'right') this.direction = 'down'
      else if (this.direction === 'left') this.direction = 'up'
      else if (this.direction === 'up') this.direction = 'left'
      else if (this.direction === 'down') this.direction = 'right'
      return
    }
    if (tile === '/') {
      if (this.direction === 'right') this.direction = 'up'
      else if (this.direction === 'left') this.direction = 'down'
      else if (this.direction === 'up') this.direction = 'right'
      else if (this.direction === 'down') this.direction = 'left'
      return
    }
    if (tile === '-') {
      if (this.direction === 'right') return
      if (this.direction === 'left') return
      if (this.direction === 'up' || this.direction === 'down') {
        this.direction = 'right'
        return {
          newBeam: new Beam({ ...this.position }, 'left', this.lines),
          originalBeamId: this.id,
        }
      }
    }
    if (tile === '|') {
      if (this.direction === 'down') return
      if (this.direction === 'up') return
      if (this.direction === 'right' || this.direction === 'left') {
        this.direction = 'up'
        return {
          newBeam: new Beam({ ...this.position }, 'down', this.lines),
          originalBeamId: this.id,
        }
      }
    }
  }

  move() {
    if (this.direction === 'right') ++this.position.x
    if (this.direction === 'down') ++this.position.y
    if (this.direction === 'left') --this.position.x
    if (this.direction === 'up') --this.position.y
  }

  getPosition() {
    return this.position
  }

  getDirection() {
    return this.direction
  }

  private _getTile() {
    if (this.lines[this.position.y]) {
      return this.lines[this.position.y][this.position.x]
    }
  }
}

export class EnergizedTiles {
  private tiles = new Set<string>()
  add(position: Position) {
    this.tiles.add(`${position.x}|${position.y}`)
  }
  count() {
    return this.tiles.size
  }
}
