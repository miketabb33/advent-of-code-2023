import { readFileSync } from 'fs'
import { describe, expect, it } from 'bun:test'
import { DigMap, parseDigPlans } from './day18Part1'
import { parseDigPlans2 } from '../day18Part2'

const input = readFileSync(`${__dirname}/../exampleInput`).toString()
const lines = input.split('\n').filter((x) => !!x)
const digPlans = parseDigPlans(lines)

describe('Parse Dig Plan', () => {
  it('should parse', () => {
    const result = parseDigPlans(lines)
    expect(result.length).toEqual(14)
    expect(result[0].direction).toEqual('right')
    expect(result[0].meters).toEqual(6)
    expect(result[0].color).toEqual('(#70c710)')
    expect(result[1].direction).toEqual('down')
    expect(result[1].meters).toEqual(5)
    expect(result[1].color).toEqual('(#0dc571)')
    expect(result[2].direction).toEqual('left')
    expect(result[7].direction).toEqual('up')
  })
})

describe('Dig Map', () => {
  describe('Create Dig Map', () => {
    it('should create it', () => {
      const result = DigMap.make(digPlans).getMap()
      expect(result.length).toEqual(38)

      expect(result[0]).toEqual({ x: 0, y: 0 })
      expect(result[1]).toEqual({ x: 1, y: 0 })
      expect(result[2]).toEqual({ x: 2, y: 0 })
      expect(result[3]).toEqual({ x: 3, y: 0 })
      expect(result[4]).toEqual({ x: 4, y: 0 })
      expect(result[5]).toEqual({ x: 5, y: 0 })
      expect(result[6]).toEqual({ x: 5, y: 1 })
      expect(result[7]).toEqual({ x: 5, y: 2 })
      expect(result[8]).toEqual({ x: 5, y: 3 })
      expect(result[9]).toEqual({ x: 5, y: 4 })
      expect(result[10]).toEqual({ x: 5, y: 5 })
      expect(result[11]).toEqual({ x: 4, y: 5 })
      expect(result[12]).toEqual({ x: 3, y: 5 })
      expect(result[13]).toEqual({ x: 3, y: 6 })
      expect(result[14]).toEqual({ x: 3, y: 7 })
      expect(result[15]).toEqual({ x: 4, y: 7 })
      expect(result[16]).toEqual({ x: 5, y: 7 })
      expect(result[17]).toEqual({ x: 5, y: 8 })
      expect(result[18]).toEqual({ x: 5, y: 9 })
      expect(result[19]).toEqual({ x: 4, y: 9 })
      expect(result[20]).toEqual({ x: 3, y: 9 })
      expect(result[21]).toEqual({ x: 2, y: 9 })
      expect(result[22]).toEqual({ x: 1, y: 9 })
      expect(result[23]).toEqual({ x: 0, y: 9 })
      expect(result[24]).toEqual({ x: 0, y: 8 })
      expect(result[25]).toEqual({ x: 0, y: 7 })
    })
  })

  describe('Box', () => {
    it('should get box', () => {
      const results = DigMap.make(digPlans).getBox()
      expect(results).toEqual({ minX: -1, minY: 0, maxX: 5, maxY: 9 })
    })
  })

  describe('Get Matrix', () => {
    it('should get matrix', () => {
      const results = DigMap.make(digPlans).getBlankMatrix()
      expect(results[0].length).toEqual(7)
      expect(results.length).toEqual(10)
      expect(results[2][5].position).toEqual({ x: 4, y: 2 })
    })
  })

  describe('Print', () => {
    it('should print', () => {
      const digMap = DigMap.make(digPlans)
      const results = digMap.print(digMap.getBlankMatrix())
      expect(results[0].length).toEqual(7)
      expect(results.length).toEqual(10)
    })
  })

  it('get it', () => {
    const examplePrint = [
      '#######',
      '#.....#',
      '###...#',
      '..#...#',
      '..#...#',
      '###.###',
      '#...#..',
      '##..###',
      '.#....#',
      '.######',
    ]
    const digMap = DigMap.make(digPlans)
    const matrix = digMap.getDigPlanMatrix()
    expect(digMap.print(matrix)).toEqual(examplePrint)
  })

  it('2', () => {
    const result = parseDigPlans2(lines)
    expect(result[0].direction).toEqual('right')
    expect(result[0].meters).toEqual(461937)
    expect(result[0].color).toEqual('(#70c710)')
  })
})
