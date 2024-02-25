import { describe, expect, it } from 'bun:test'
import { readFileSync } from 'fs'
import {
  day22Part1,
  dropBricks,
  getBrickCoordinates,
  getBrickTopDown,
  parseBrickInput,
} from './part1'

const input = readFileSync(`${__dirname}/../exampleInput`).toString()
const lines = input.split('\n').filter((x) => !!x)
const parsedBricks = parseBrickInput(lines)
const bricks = parsedBricks.bricks

describe('starter', () => {
  it('should return example', () => {
    const result = day22Part1(input)
    expect(result).toEqual(5)
  })
})

describe('drop bricks', () => {
  it('should drop', () => {
    const result = dropBricks(parsedBricks)
    expect(result[0].coord1).toEqual({ x: 1, y: 0, z: 1 })
    expect(result[0].coord2).toEqual({ x: 1, y: 2, z: 1 })

    expect(result[1].coord1).toEqual({ x: 0, y: 0, z: 2 })
    expect(result[1].coord2).toEqual({ x: 2, y: 0, z: 2 })

    expect(result[2].coord1).toEqual({ x: 0, y: 2, z: 2 })
    expect(result[2].coord2).toEqual({ x: 2, y: 2, z: 2 })

    expect(result[3].coord1).toEqual({ x: 0, y: 0, z: 3 })
    expect(result[3].coord2).toEqual({ x: 0, y: 2, z: 3 })

    expect(result[4].coord1).toEqual({ x: 2, y: 0, z: 3 })
    expect(result[4].coord2).toEqual({ x: 2, y: 2, z: 3 })

    expect(result[5].coord1).toEqual({ x: 0, y: 1, z: 4 })
    expect(result[5].coord2).toEqual({ x: 2, y: 1, z: 4 })

    expect(result[6].coord1).toEqual({ x: 1, y: 1, z: 5 })
    expect(result[6].coord2).toEqual({ x: 1, y: 1, z: 6 })

    expect(result[7].coord1).toEqual({ x: 1, y: 0, z: 7 })
    expect(result[7].coord2).toEqual({ x: 1, y: 2, z: 7 })
  })
})

describe('Brick Coords', () => {
  it('should get 1', () => {
    const result = getBrickCoordinates(bricks[0])
    expect(result.length).toEqual(3)
    expect(result[0]).toEqual({ x: 1, y: 0, z: 1 })
    expect(result[1]).toEqual({ x: 1, y: 1, z: 1 })
    expect(result[2]).toEqual({ x: 1, y: 2, z: 1 })
  })

  it('should get 2', () => {
    const result = getBrickCoordinates(bricks[1])
    expect(result.length).toEqual(3)
    expect(result[0]).toEqual({ x: 0, y: 0, z: 2 })
    expect(result[1]).toEqual({ x: 1, y: 0, z: 2 })
    expect(result[2]).toEqual({ x: 2, y: 0, z: 2 })
  })

  it('should get 7', () => {
    const result = getBrickCoordinates(bricks[6])
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual({ x: 1, y: 1, z: 8 })
    expect(result[1]).toEqual({ x: 1, y: 1, z: 9 })
  })
})

describe('brick bottom', () => {
  it('should get brick 1', () => {
    const results = getBrickTopDown(bricks[0])
    expect(results.length).toEqual(3)

    expect(results[0]).toEqual({ x: 1, y: 0 })
    expect(results[1]).toEqual({ x: 1, y: 1 })
    expect(results[2]).toEqual({ x: 1, y: 2 })
  })

  it('should get brick 2', () => {
    const results = getBrickTopDown(bricks[1])
    expect(results.length).toEqual(3)
    expect(results[0]).toEqual({ x: 0, y: 0 })
    expect(results[1]).toEqual({ x: 1, y: 0 })
    expect(results[2]).toEqual({ x: 2, y: 0 })
  })

  it('should get brick 3', () => {
    const results = getBrickTopDown(bricks[2])
    expect(results.length).toEqual(3)
    expect(results[0]).toEqual({ x: 0, y: 2 })
    expect(results[1]).toEqual({ x: 1, y: 2 })
    expect(results[2]).toEqual({ x: 2, y: 2 })
  })

  it('should get brick 4', () => {
    const results = getBrickTopDown(bricks[3])
    expect(results.length).toEqual(3)
    expect(results[0]).toEqual({ x: 0, y: 0 })
    expect(results[1]).toEqual({ x: 0, y: 1 })
    expect(results[2]).toEqual({ x: 0, y: 2 })
  })

  it('should get brick 7', () => {
    const results = getBrickTopDown(bricks[6])
    expect(results.length).toEqual(1)
    expect(results[0]).toEqual({ x: 1, y: 1 })
  })
})

describe('Parse Brick Input', () => {
  it('should return empty arr when given an arr', () => {
    const result = parseBrickInput([]).bricks
    expect(result).toEqual([])
  })

  it('should parse', () => {
    const result = parseBrickInput(lines).bricks
    expect(parseBrickInput(lines).size).toEqual(2)
    expect(result.length).toEqual(8)

    expect(result[0].id).toEqual(0)
    expect(result[0].coord1.x).toEqual(1)
    expect(result[0].coord1.y).toEqual(0)
    expect(result[0].coord1.z).toEqual(1)
    expect(result[0].coord2.x).toEqual(1)
    expect(result[0].coord2.y).toEqual(2)
    expect(result[0].coord2.z).toEqual(1)
    expect(result[0].type).toEqual('column')

    expect(result[1].id).toEqual(1)
    expect(result[1].coord1.x).toEqual(0)
    expect(result[1].coord1.y).toEqual(0)
    expect(result[1].coord1.z).toEqual(2)
    expect(result[1].coord2.x).toEqual(2)
    expect(result[1].coord2.y).toEqual(0)
    expect(result[1].coord2.z).toEqual(2)
    expect(result[1].type).toEqual('row')

    expect(result[2].id).toEqual(2)
    expect(result[2].coord1.x).toEqual(0)
    expect(result[2].coord1.y).toEqual(2)
    expect(result[2].coord1.z).toEqual(3)
    expect(result[2].coord2.x).toEqual(2)
    expect(result[2].coord2.y).toEqual(2)
    expect(result[2].coord2.z).toEqual(3)

    expect(result[3].id).toEqual(3)
    expect(result[3].coord1.z).toEqual(4)

    expect(result[4].id).toEqual(4)
    expect(result[4].coord1.z).toEqual(5)

    expect(result[5].id).toEqual(5)
    expect(result[5].coord1.z).toEqual(6)

    expect(result[6].id).toEqual(6)
    expect(result[6].coord1.z).toEqual(8)
    expect(result[6].type).toEqual('vertical')
  })
})
