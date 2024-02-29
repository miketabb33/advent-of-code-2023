import { describe, expect, it } from 'bun:test'
import { readFileSync } from 'fs'
import { Current, MazeMap, Point, day23Part1 } from './part1'

const input = readFileSync(`${__dirname}/../exampleInput`).toString()
const map = new MazeMap(input)
const startPoint: Point = { x: 1, y: 0 }

describe('Start', () => {
  expect(day23Part1(input)).toEqual(94)
})

describe('Maze Map', () => {
  it('should get for position 0,0', () => {
    expect(map.getItem({ x: 0, y: 0 })).toEqual('#')
  })
  it('should get for position 1,0', () => {
    expect(map.getItem({ x: 1, y: 0 })).toEqual('.')
  })
  it('should get for position 10,3', () => {
    expect(map.getItem({ x: 10, y: 3 })).toEqual('>')
  })
})

describe('Find Next Points', () => {
  it('should find first', () => {
    const results1 = map.findNextPoints(startPoint)
    expect(results1.length).toEqual(1)
    expect(results1[0]).toEqual({ point: { x: 1, y: 1 }, value: '.' })

    const results2 = map.findNextPoints(results1[0].point)
    expect(results2[1]).toEqual({ point: { x: 2, y: 1 }, value: '.' })
  })

  it('should find next gap', () => {
    const results1 = map.findNextPoints({ x: 7, y: 1 })
    expect(results1[0]).toEqual({ point: { x: 7, y: 2 }, value: '.' })

    const results2 = map.findNextPoints({ x: 7, y: 2 })
    expect(results2[0]).toEqual({ point: { x: 7, y: 3 }, value: '.' })

    const results3 = map.findNextPoints({ x: 7, y: 3 })
    expect(results3[1]).toEqual({ point: { x: 6, y: 3 }, value: '.' })

    const results4 = map.findNextPoints({ x: 6, y: 3 })
    expect(results4[0]).toEqual({ point: { x: 7, y: 3 }, value: '.' })
    expect(results4[1]).toEqual({ point: { x: 5, y: 3 }, value: '.' })

    const results5 = map.findNextPoints({ x: 9, y: 11 })
    expect(results5[0]).toEqual({ point: { x: 9, y: 10 }, value: '.' })
    expect(results5[1]).toEqual({ point: { x: 8, y: 11 }, value: '.' })
  })
})

describe('Current', () => {
  it('should return starter', () => {
    const current = new Current()
    expect(current.point()).toEqual({ x: 1, y: 0 })
  })

  it('should move to the next valid spot', () => {
    const current = new Current()
    current.move(map.findNextPoints(current.point()))
    expect(current.point()).toEqual({ x: 1, y: 1 })

    current.move(map.findNextPoints(current.point()))
    expect(current.point()).toEqual({ x: 2, y: 1 })

    current.move(map.findNextPoints(current.point()))
    expect(current.point()).toEqual({ x: 3, y: 1 })

    current.move(map.findNextPoints(current.point()))
    expect(current.point()).toEqual({ x: 4, y: 1 })

    current.move(map.findNextPoints(current.point()))
    expect(current.point()).toEqual({ x: 5, y: 1 })

    current.move(map.findNextPoints(current.point()))
    expect(current.point()).toEqual({ x: 6, y: 1 })

    current.move(map.findNextPoints(current.point()))
    expect(current.point()).toEqual({ x: 7, y: 1 })

    current.move(map.findNextPoints(current.point()))
    expect(current.point()).toEqual({ x: 7, y: 2 })

    current.move(map.findNextPoints(current.point()))
    expect(current.point()).toEqual({ x: 7, y: 3 })

    current.move(map.findNextPoints(current.point()))
    expect(current.point()).toEqual({ x: 6, y: 3 })
  })

  it('should handle v', () => {
    const current = new Current()
    for (let i = 0; i < 13; i++)
      current.move(map.findNextPoints(current.point()))
    expect(current.point()).toEqual({ x: 3, y: 3 })

    current.move(map.findNextPoints(current.point()))
    expect(current.point()).toEqual({ x: 3, y: 5 })
  })
})
