import { describe, expect, it } from 'bun:test'
import { readFileSync } from 'fs'
import { ConditionalRule, parseWorkflows, splitParts } from './part1'

const input = readFileSync(`${__dirname}/../exampleInput`).toString()
const parts = splitParts(input)

describe('should parse', () => {
  it('split parts', () => {
    expect(parts.length).toEqual(2)
    expect(parts[0].length).toEqual(11)
    expect(parts[1].length).toEqual(5)
  })

  it('should parse workflows', () => {
    const results = parseWorkflows(parts[0])
    const result1 = results.get('px')
    expect(result1?.length).toEqual(3)
  })
})
