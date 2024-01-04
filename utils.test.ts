import { describe, expect, it } from 'bun:test'
import { rotateClockwise } from './utils'

describe('Rotate Clockwise', () => {
  it('should rotate', () => {
    const lines = ['#.##.', '..#.#', '##...']
    const result = rotateClockwise(lines)
    expect(result.length).toEqual(5)
    expect(result[0]).toEqual('#.#')
    expect(result[1]).toEqual('#..')
    expect(result[3]).toEqual('..#')
  })
})
