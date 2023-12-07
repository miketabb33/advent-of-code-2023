import { describe, expect, it } from 'bun:test'
import { readFileSync } from 'fs'
import { parseAlmanacSections } from './parseAlmanacSections'
import { processAlmanacSeed } from './processAlmanacSeed'

const exampleInput = readFileSync(`${__dirname}/../exampleInput`)
  .toString()
  .split('\n\n')
  .slice(1)

const almanacSections = parseAlmanacSections(exampleInput)

describe('Process Almanac Seed', () => {
  it('Should run', () => {
    const result = processAlmanacSeed({
      almanacSeed: { start: 79, length: 14 },
      almanacSections,
    })
    expect(result.length).toEqual(14)
  })
})
