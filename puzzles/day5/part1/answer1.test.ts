import { describe, expect, it } from 'bun:test'
import { answer1Day5 } from './answer1'
import { readFileSync } from 'fs'

describe('Answer 1', () => {
  it('should resolve example', () => {
    const exampleInput = readFileSync(`${__dirname}/../exampleInput`).toString()
    expect(answer1Day5(exampleInput)).toEqual([82, 43, 86, 35])
  })
})
