import { describe, expect, it } from 'bun:test'
import { SchematicLine, SchematicResult } from '../types'
import {
  findPartNumbersForLine,
  findPartNumbersForLines,
} from './calculatePartNumbersForInput'

describe('Find Part Numbers For Line', () => {
  it('should not return part number when symbol is in front but not adjacent', () => {
    const line: SchematicLine = {
      partNumbers: [{ index: 4, value: '456' }],
      symbols: [{ index: 2, value: '@' }],
    }
    expect(findPartNumbersForLine(line)).toEqual([])
  })
  it('should return part number when symbol is in front', () => {
    const line: SchematicLine = {
      partNumbers: [{ index: 4, value: '456' }],
      symbols: [{ index: 3, value: '@' }],
    }
    expect(findPartNumbersForLine(line)).toEqual([456])
  })
  it('should not return part number when symbol is after but not adjacent', () => {
    const line: SchematicLine = {
      partNumbers: [{ index: 4, value: '456' }],
      symbols: [{ index: 8, value: '@' }],
    }
    expect(findPartNumbersForLine(line)).toEqual([])
  })
  it('should return part number when symbol is index after number', () => {
    const line: SchematicLine = {
      partNumbers: [{ index: 4, value: '456' }],
      symbols: [{ index: 7, value: '@' }],
    }
    expect(findPartNumbersForLine(line)).toEqual([456])
  })
})

describe('Find Part Numbers For Line', () => {
  it('should not return part number when symbol is too far front in front', () => {
    const symbols: SchematicResult[] = [{ index: 0, value: '@' }]
    const parts: SchematicResult[] = [{ index: 2, value: '123' }]
    expect(findPartNumbersForLines({ parts, symbols })).toEqual([])
  })
  it('should return part number when symbol is adjacent', () => {
    const symbols: SchematicResult[] = [{ index: 1, value: '@' }]
    const parts: SchematicResult[] = [{ index: 2, value: '123' }]
    expect(findPartNumbersForLines({ parts, symbols })).toEqual([123])
  })
  it('should return part number when symbol is overlapping - 1', () => {
    const symbols: SchematicResult[] = [{ index: 2, value: '@' }]
    const parts: SchematicResult[] = [{ index: 2, value: '123' }]
    expect(findPartNumbersForLines({ parts, symbols })).toEqual([123])
  })
  it('should return part number when symbol is overlapping - 2', () => {
    const symbols: SchematicResult[] = [{ index: 4, value: '@' }]
    const parts: SchematicResult[] = [{ index: 2, value: '123' }]
    expect(findPartNumbersForLines({ parts, symbols })).toEqual([123])
  })
  it('should return part number when symbol adjacent to end', () => {
    const symbols: SchematicResult[] = [{ index: 5, value: '@' }]
    const parts: SchematicResult[] = [{ index: 2, value: '123' }]
    expect(findPartNumbersForLines({ parts, symbols })).toEqual([123])
  })
  it('should NOT return part number when symbol past to end', () => {
    const symbols: SchematicResult[] = [{ index: 6, value: '@' }]
    const parts: SchematicResult[] = [{ index: 2, value: '123' }]
    expect(findPartNumbersForLines({ parts, symbols })).toEqual([])
  })
})
