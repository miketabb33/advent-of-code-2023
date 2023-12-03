import { describe, expect, it } from 'bun:test'
import { SchematicLine } from '../types'
import { findPartNumbersForLine } from './calculatePartNumbersForInput'

describe('Find Part Numbers For Line', () => {
  it('should not return part number when symbol is in front but not adjacent', () => {
    const line: SchematicLine = {
      lineNumber: 1,
      partNumbers: [{ index: 4, value: '456' }],
      symbols: [{ index: 2, value: '@' }],
    }
    expect(findPartNumbersForLine(line)).toEqual([])
  })
  it('should return part number when symbol is in front', () => {
    const line: SchematicLine = {
      lineNumber: 1,
      partNumbers: [{ index: 4, value: '456' }],
      symbols: [{ index: 3, value: '@' }],
    }
    expect(findPartNumbersForLine(line)).toEqual([456])
  })
  it('should not return part number when symbol is after but not adjacent', () => {
    const line: SchematicLine = {
      lineNumber: 1,
      partNumbers: [{ index: 4, value: '456' }],
      symbols: [{ index: 8, value: '@' }],
    }
    expect(findPartNumbersForLine(line)).toEqual([])
  })
  it('should return part number when symbol is index after number', () => {
    const line: SchematicLine = {
      lineNumber: 1,
      partNumbers: [{ index: 4, value: '456' }],
      symbols: [{ index: 7, value: '@' }],
    }
    expect(findPartNumbersForLine(line)).toEqual([456])
  })
})
