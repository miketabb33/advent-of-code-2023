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
  while (i < 10_000) {
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
      const newBeam = beam.updateDirectionAndGetSplitWhenAvailable()
      if (newBeam) beamCache.push(newBeam)
    })
    beamCache.forEach((cacheItem) => this.beams.push(cacheItem))
  }
}

export class Beam {
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

  updateDirectionAndGetSplitWhenAvailable() {
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
        return new Beam(this.position, 'left', this.lines)
      }
    }
    if (tile === '|') {
      if (this.direction === 'down') return
      if (this.direction === 'up') return
      if (this.direction === 'right' || this.direction === 'left') {
        this.direction = 'up'
        return new Beam(this.position, 'down', this.lines)
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
    console.log(this.tiles)
    return this.tiles.size
  }
}
