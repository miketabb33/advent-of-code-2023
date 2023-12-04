import { describe, expect, it } from 'bun:test'
import { SchematicLine, SchematicResult } from '../types'
import { findGearMatches } from './calculateGears'

describe('Find Gear Matches', () => {
  it('should create Gear Match', () => {
    const above: SchematicResult[] = [{ index: 3, value: '234' }]
    const target: SchematicLine = {
      partNumbers: [],
      symbols: [{ index: 3, value: '*' }],
    }
    const below: SchematicResult[] = [{ index: 3, value: '123' }]
    const result = findGearMatches(above, target, below)
    expect(result).toEqual([{ symbol: '*', parts: [234, 123] }])
  })
})
