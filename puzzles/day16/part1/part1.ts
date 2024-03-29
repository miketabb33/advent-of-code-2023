import { v4 as uuidv4 } from 'uuid'

type Split = {
  direction: Direction
  position: Position
}

type Position = {
  x: number
  y: number
}

export type Direction = 'left' | 'right' | 'up' | 'down'

export const day16Part1 = (input: string) => {
  const lines = input.split('\n').filter((x) => !!x)

  const energizedTiles = new EnergizedTiles()
  const beamGroup = new BeamGroup([new Beam({ x: 0, y: 0 }, 'right', lines)])

  let i = 0
  while (i < 550) {
    frameBeam(beamGroup, energizedTiles)
    i++
  }

  return energizedTiles.count()
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
  private splitCache: Split[] = []

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
