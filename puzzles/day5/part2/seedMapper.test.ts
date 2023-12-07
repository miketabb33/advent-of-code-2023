import { describe, expect, it } from 'bun:test'
import { readFileSync } from 'fs'
import { parseAlmanacSections } from './parseAlmanacSections'
import { seedMapper } from './seedMapper'

const exampleInput = readFileSync(`${__dirname}/../exampleInput`)
  .toString()
  .split('\n\n')
  .slice(1)

const almanacSections = parseAlmanacSections(exampleInput)

describe('Seed Mapper', () => {
  it('should map seed 79', () => {
    const result = seedMapper(79, almanacSections)
    expect(result).toEqual(82)
  })
  it('should map seed 14', () => {
    const result = seedMapper(14, almanacSections)
    expect(result).toEqual(43)
  })
  it('should map seed 55', () => {
    const result = seedMapper(55, almanacSections)
    expect(result).toEqual(86)
  })
  it('should map seed 35', () => {
    const result = seedMapper(13, almanacSections)
    expect(result).toEqual(35)
  })
})
