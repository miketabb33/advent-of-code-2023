import { describe, expect, it } from 'bun:test'
import { readFileSync } from 'fs'
import { dropBricks, parseBrickInput } from './part1'

const input = readFileSync(`${__dirname}/../exampleInput`).toString()
const lines = input.split('\n').filter((x) => !!x)
const parsedBricks = parseBrickInput(lines)

describe('drop bricks', () => {
  it('should drop', () => {
    const result = dropBricks(parsedBricks)
    console.log(result)
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
    expect(result.length).toEqual(7)

    expect(result[0].id).toEqual(0)
    expect(result[0].coord1.x).toEqual(1)
    expect(result[0].coord1.y).toEqual(0)
    expect(result[0].coord1.z).toEqual(1)
    expect(result[0].coord2.x).toEqual(1)
    expect(result[0].coord2.y).toEqual(2)
    expect(result[0].coord2.z).toEqual(1)

    expect(result[1].id).toEqual(1)
    expect(result[1].coord1.x).toEqual(0)
    expect(result[1].coord1.y).toEqual(0)
    expect(result[1].coord1.z).toEqual(2)
    expect(result[1].coord2.x).toEqual(2)
    expect(result[1].coord2.y).toEqual(0)
    expect(result[1].coord2.z).toEqual(2)

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
  })
})
