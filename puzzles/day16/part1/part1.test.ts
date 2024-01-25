import { describe, expect, it } from 'bun:test'
import { Beam, BeamGroup, EnergizedTiles, day16Part1, frameBeam } from './part1'
import { readFileSync } from 'fs'

const input = readFileSync(`${__dirname}/../exampleInput`).toString()
const lines = input.split('\n').filter((x) => !!x)

describe('Frame Beam', () => {
  it('should go', () => {
    const energizedTiles = new EnergizedTiles()
    const beams = new BeamGroup([new Beam({ x: 0, y: 0 }, 'right', lines)])

    frameBeam(beams, energizedTiles)
    expect(beams.getBeams().length).toEqual(1)
    expect(beams.getBeams()[0].getDirection()).toEqual('right')
    expect(beams.getBeams()[0].getPosition()).toEqual({ x: 1, y: 0 })
    expect(energizedTiles.count()).toEqual(1)

    frameBeam(beams, energizedTiles)
    expect(beams.getBeams().length).toEqual(2)
    expect(beams.getBeams()[0].getDirection()).toEqual('up')
    expect(beams.getBeams()[0].getPosition()).toEqual({ x: 1, y: -1 })
    expect(beams.getBeams()[1].getDirection()).toEqual('down')
    expect(beams.getBeams()[1].getPosition()).toEqual({ x: 1, y: 1 })
    expect(energizedTiles.count()).toEqual(2)
  })

  it('should go without split', () => {
    const energizedTiles = new EnergizedTiles()
    const beams = new BeamGroup([new Beam({ x: 0, y: 5 }, 'right', lines)])

    frameBeam(beams, energizedTiles)
    expect(beams.getBeams().length).toEqual(1)
    expect(beams.getBeams()[0].getDirection()).toEqual('right')
    expect(beams.getBeams()[0].getPosition()).toEqual({ x: 1, y: 5 })
    expect(energizedTiles.count()).toEqual(1)

    frameBeam(beams, energizedTiles)
    frameBeam(beams, energizedTiles)
    frameBeam(beams, energizedTiles)
    frameBeam(beams, energizedTiles)
    frameBeam(beams, energizedTiles)
    frameBeam(beams, energizedTiles)
    frameBeam(beams, energizedTiles)
    frameBeam(beams, energizedTiles)
    expect(beams.getBeams().length).toEqual(1)
    expect(beams.getBeams()[0].getDirection()).toEqual('right')
    expect(beams.getBeams()[0].getPosition()).toEqual({ x: 9, y: 5 })
    expect(energizedTiles.count()).toEqual(9)

    frameBeam(beams, energizedTiles)
    expect(beams.getBeams().length).toEqual(1)
    expect(beams.getBeams()[0].getDirection()).toEqual('down')
    expect(beams.getBeams()[0].getPosition()).toEqual({ x: 9, y: 6 })
    expect(energizedTiles.count()).toEqual(10)

    frameBeam(beams, energizedTiles)
    frameBeam(beams, energizedTiles)
    frameBeam(beams, energizedTiles)
    expect(beams.getBeams().length).toEqual(1)
    expect(beams.getBeams()[0].getDirection()).toEqual('right')
    expect(beams.getBeams()[0].getPosition()).toEqual({ x: 10, y: 8 })
    expect(energizedTiles.count()).toEqual(13)

    frameBeam(beams, energizedTiles)
    expect(beams.getBeams().length).toEqual(0)
    expect(energizedTiles.count()).toEqual(13)
    expect(beams.isEmpty()).toBeTrue()
  })
})

describe('Beam Group', () => {
  describe('is empty', () => {
    it('should be empty when no active beams', () => {
      const beams = new BeamGroup([])
      expect(beams.isEmpty()).toEqual(true)
    })

    it('should NOT empty when no active beams', () => {
      const beam = new Beam({ x: 0, y: 0 }, 'right', lines)
      const beams = new BeamGroup([beam])
      expect(beams.isEmpty()).toEqual(false)
    })
  })

  describe('clear invalid', () => {
    it('should clear', () => {
      const beam1 = new Beam({ x: 0, y: 0 }, 'right', lines)
      const beam2 = new Beam({ x: -1, y: 0 }, 'right', lines)
      const beam3 = new Beam({ x: 0, y: 10 }, 'right', lines)
      const beam4 = new Beam({ x: 5, y: 5 }, 'right', lines)

      const beams = new BeamGroup([beam1, beam2, beam3, beam4])
      beams.clearInvalid()
      expect(beams.getBeams().length).toEqual(2)
    })
  })

  describe('add energized tiles', () => {
    it('should add energized tiles', () => {
      const subject = new EnergizedTiles()
      const beam1 = new Beam({ x: 1, y: 0 }, 'right', lines)
      const beam2 = new Beam({ x: 2, y: 1 }, 'down', lines)
      const beam3 = new Beam({ x: 0, y: 2 }, 'right', lines)
      const beams = new BeamGroup([beam1, beam2, beam3])

      beams.addEnergizedTiles(subject)

      expect(subject.count()).toBe(3)
    })
  })
  describe('update Directions', () => {
    it('should update directions', () => {
      const beam1 = new Beam({ x: 1, y: 0 }, 'right', lines)
      const beam2 = new Beam({ x: 2, y: 1 }, 'down', lines)
      const beam3 = new Beam({ x: 0, y: 2 }, 'right', lines)
      const beams = new BeamGroup([beam1, beam2, beam3])
      beams.updateDirections()

      expect(beams.getBeams().length).toEqual(5)

      expect(beams.getBeams()[0].getDirection()).toEqual('up')
      expect(beams.getBeams()[0].getPosition()).toEqual({ x: 1, y: 0 })

      expect(beams.getBeams()[1].getDirection()).toEqual('right')
      expect(beams.getBeams()[1].getPosition()).toEqual({ x: 2, y: 1 })

      expect(beams.getBeams()[2].getDirection()).toEqual('right')
      expect(beams.getBeams()[2].getPosition()).toEqual({ x: 0, y: 2 })

      expect(beams.getBeams()[3].getDirection()).toEqual('down')
      expect(beams.getBeams()[3].getPosition()).toEqual({ x: 1, y: 0 })

      expect(beams.getBeams()[4].getDirection()).toEqual('left')
      expect(beams.getBeams()[4].getPosition()).toEqual({ x: 2, y: 1 })
    })
  })
})

describe('Beam', () => {
  describe('Is Valid', () => {
    it('should return true when position is on the map: top left', () => {
      const beam = new Beam({ x: 0, y: 0 }, 'right', lines)
      expect(beam.isValid()).toEqual(true)
    })
    it('should return true when position is on the map: bottom right', () => {
      const beam = new Beam({ x: 9, y: 9 }, 'right', lines)
      expect(beam.isValid()).toEqual(true)
    })
    it('should return true when position is on the map: bottom left', () => {
      const beam = new Beam({ x: 0, y: 9 }, 'right', lines)
      expect(beam.isValid()).toEqual(true)
    })
    it('should return true when position is on the map: top right', () => {
      const beam = new Beam({ x: 9, y: 0 }, 'right', lines)
      expect(beam.isValid()).toEqual(true)
    })
    it('should return true when position is on the map: middle', () => {
      const beam = new Beam({ x: 5, y: 5 }, 'right', lines)
      expect(beam.isValid()).toEqual(true)
    })
    it('should return false when position out on left', () => {
      const beam = new Beam({ x: -1, y: 5 }, 'right', lines)
      expect(beam.isValid()).toEqual(false)
    })
    it('should return false when position out on right', () => {
      const beam = new Beam({ x: 10, y: 5 }, 'right', lines)
      expect(beam.isValid()).toEqual(false)
    })
    it('should return false when position out on top', () => {
      const beam = new Beam({ x: 0, y: -1 }, 'right', lines)
      expect(beam.isValid()).toEqual(false)
    })
    it('should return false when position out on top', () => {
      const beam = new Beam({ x: 0, y: 10 }, 'right', lines)
      expect(beam.isValid()).toEqual(false)
    })
  })

  describe('Update Direction', () => {
    it('should not update when tile is a .', () => {
      const beam = new Beam({ x: 0, y: 0 }, 'right', lines)
      beam.updateDirectionAndGetSplitWhenAvailable()
      expect(beam.getDirection()).toEqual('right')
    })
    describe('\\', () => {
      it('when going right, should update to down', () => {
        const beam = new Beam({ x: 5, y: 0 }, 'right', lines)
        beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('down')
      })
      it('when going left, should update to up', () => {
        const beam = new Beam({ x: 5, y: 0 }, 'left', lines)
        beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('up')
      })
      it('when going up, should update to left', () => {
        const beam = new Beam({ x: 5, y: 0 }, 'up', lines)
        beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('left')
      })
      it('when going down, should update to right', () => {
        const beam = new Beam({ x: 5, y: 0 }, 'down', lines)
        beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('right')
      })
    })
    describe('/', () => {
      it('when going right, should update to up', () => {
        const beam = new Beam({ x: 4, y: 6 }, 'right', lines)
        beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('up')
      })
      it('when going left, should update to down', () => {
        const beam = new Beam({ x: 4, y: 6 }, 'left', lines)
        beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('down')
      })
      it('when going up, should update to right', () => {
        const beam = new Beam({ x: 4, y: 6 }, 'up', lines)
        beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('right')
      })
      it('when going down, should update to left', () => {
        const beam = new Beam({ x: 4, y: 6 }, 'down', lines)
        beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('left')
      })
    })
    describe('-', () => {
      it('when going right, should continue right', () => {
        const beam = new Beam({ x: 2, y: 1 }, 'right', lines)
        beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('right')
      })
      it('when going left, should continue left', () => {
        const beam = new Beam({ x: 2, y: 1 }, 'left', lines)
        beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('left')
      })
      it('when going up, should update right and create split', () => {
        const beam = new Beam({ x: 2, y: 1 }, 'up', lines)
        const result = beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('right')
        expect(result?.newBeam.getPosition()).toEqual(beam.getPosition())
        expect(result?.newBeam.getDirection()).toEqual('left')
      })
      it('when going down, should update right and create split', () => {
        const beam = new Beam({ x: 2, y: 1 }, 'up', lines)
        const result = beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('right')
        expect(result?.newBeam.getPosition()).toEqual(beam.getPosition())
        expect(result?.newBeam.getDirection()).toEqual('left')
      })
    })
    describe('|', () => {
      it('when going down, should continue down', () => {
        const beam = new Beam({ x: 1, y: 0 }, 'down', lines)
        beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('down')
      })
      it('when going up, should continue up', () => {
        const beam = new Beam({ x: 1, y: 0 }, 'up', lines)
        beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('up')
      })
      it('when going right, should update up and create split', () => {
        const beam = new Beam({ x: 1, y: 0 }, 'right', lines)
        const result = beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('up')
        expect(result?.newBeam.getPosition()).toEqual(beam.getPosition())
        expect(result?.newBeam.getDirection()).toEqual('down')
      })
      it('when going left, should update up and create split', () => {
        const beam = new Beam({ x: 1, y: 0 }, 'left', lines)
        const result = beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('up')
        expect(result?.newBeam.getPosition()).toEqual(beam.getPosition())
        expect(result?.newBeam.getDirection()).toEqual('down')
      })
      it('when going down, should update right and create split', () => {
        const beam = new Beam({ x: 2, y: 1 }, 'up', lines)
        const result = beam.updateDirectionAndGetSplitWhenAvailable()
        expect(beam.getDirection()).toEqual('right')
        expect(result?.newBeam.getPosition()).toEqual(beam.getPosition())
        expect(result?.newBeam.getDirection()).toEqual('left')
      })
    })
  })

  describe('Move', () => {
    it('should move right when tile is dot', () => {
      const beam = new Beam({ x: 2, y: 4 }, 'right', lines)
      beam.move()
      expect(beam.getPosition()).toEqual({ x: 3, y: 4 })
    })
    it('should move down when tile is dot', () => {
      const beam = new Beam({ x: 2, y: 4 }, 'down', lines)
      beam.move()
      expect(beam.getPosition()).toEqual({ x: 2, y: 5 })
    })
    it('should move left when tile is dot', () => {
      const beam = new Beam({ x: 2, y: 4 }, 'left', lines)
      beam.move()
      expect(beam.getPosition()).toEqual({ x: 1, y: 4 })
    })
    it('should move up when tile is dot', () => {
      const beam = new Beam({ x: 2, y: 4 }, 'up', lines)
      beam.move()
      expect(beam.getPosition()).toEqual({ x: 2, y: 3 })
    })
  })
})

describe('Energized Tile', () => {
  it('should add 1', () => {
    const subject = new EnergizedTiles()
    subject.add({ x: 1, y: 1 })
    expect(subject.count()).toEqual(1)
  })

  it('should add 2', () => {
    const subject = new EnergizedTiles()
    subject.add({ x: 1, y: 1 })
    subject.add({ x: 2, y: 2 })
    expect(subject.count()).toEqual(2)
  })

  it('should not add if it already exists', () => {
    const subject = new EnergizedTiles()
    subject.add({ x: 1, y: 1 })
    subject.add({ x: 2, y: 2 })
    subject.add({ x: 2, y: 2 })
    expect(subject.count()).toEqual(2)
  })

  it('should handle many entries', () => {
    const subject = new EnergizedTiles()
    subject.add({ x: 1, y: 1 })
    subject.add({ x: 2, y: 2 })
    subject.add({ x: 2, y: 2 })
    subject.add({ x: 1, y: 1 })
    subject.add({ x: 1, y: 2 })
    subject.add({ x: 2, y: 1 })
    subject.add({ x: 2, y: 50 })
    expect(subject.count()).toEqual(5)
  })
})
