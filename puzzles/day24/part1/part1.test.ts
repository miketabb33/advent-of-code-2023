import { describe, expect, it } from 'bun:test'
import { readFileSync } from 'fs'
import { HailStone, day24Part1, findIntersection } from './part1'

const input = readFileSync(`${__dirname}/../exampleInput`).toString()
const lines = input.split('\n').filter((x) => !!x)

describe('Day24Part1', () => {
  it('should return example', () => {
    const results = day24Part1(input, 7, 27)
    // expect(results).toEqual(2)
  })
})

describe('Hail Stone', () => {
  it('should parse first line', () => {
    const hailStone = new HailStone(lines[0])
    expect(hailStone.getLastMotion().position).toEqual({ x: 19, y: 13, z: 30 })
    expect(hailStone.getLastMotion().velocity).toEqual({ x: -2, y: 1, z: -2 })
  })

  it('should parse other lines', () => {
    const hailStone = new HailStone(lines[4])
    expect(hailStone.getLastMotion().position).toEqual({ x: 20, y: 19, z: 15 })
    expect(hailStone.getLastMotion().velocity).toEqual({ x: 1, y: -5, z: -3 })
  })
})

describe('Find Intersection', () => {
  it('should match 1 and 2', () => {
    const hailStone1 = new HailStone(lines[0])
    const hailStone2 = new HailStone(lines[1])
    const result = findIntersection(
      hailStone1.getLastMotion(),
      hailStone2.getLastMotion()
    )
    expect(result.x).toEqual(14.333)
    expect(result.y).toEqual(15.333)
  })

  it('should match 1 and 3', () => {
    const hailStone1 = new HailStone(lines[0])
    const hailStone2 = new HailStone(lines[2])
    const result = findIntersection(
      hailStone1.getLastMotion(),
      hailStone2.getLastMotion()
    )
    expect(result.x).toEqual(11.667)
    expect(result.y).toEqual(16.667)
  })
})
