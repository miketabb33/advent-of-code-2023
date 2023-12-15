import { describe, expect, it } from 'bun:test'
import { findSpringArrangements, parseSprings } from './parseSprings'
import { SpringRow } from './types'

describe('Parse Spring', () => {
  it('should parse', () => {
    const input =
      '#.#.### 1,1,3\n.#...#....###. 1,1,3\n????.######..#####. 1,6,5\n.#.###.#.###### 1,3,1,6'
    const results = parseSprings(input)
    expect(results.length).toEqual(4)

    expect(results[0].springs).toEqual('#.#.###')
    expect(results[0].groups).toEqual([1, 1, 3])

    expect(results[1].springs).toEqual('.#...#....###.')
    expect(results[1].groups).toEqual([1, 1, 3])

    expect(results[2].springs).toEqual('????.######..#####.')
    expect(results[2].groups).toEqual([1, 6, 5])

    expect(results[3].springs).toEqual('.#.###.#.######')
    expect(results[3].groups).toEqual([1, 3, 1, 6])
  })
})

describe('Find Spring Arrangements', () => {
  it('should find arrangements for example 1', () => {
    const row: SpringRow = {
      springs: '???.###',
      groups: [1, 1, 3],
    }
    expect(findSpringArrangements(row)).toEqual(1)
  })

  it('should find arrangements for example 2', () => {
    const row: SpringRow = {
      springs: '.??..??...?##.',
      groups: [1, 1, 3],
    }
    expect(findSpringArrangements(row)).toEqual(4)
  })
})

// * `???.### 1,1,3` - `*1*` arrangement
// * `.??..??...?##. 1,1,3` - `*4*` arrangements
// * `?#?#?#?#?#?#?#? 1,3,1,6` - `*1*` arrangement
// * `????.#...#... 4,1,1` - `*1*` arrangement
// * `????.######..#####. 1,6,5` - `*4*` arrangements
// * `?###???????? 3,2,1` - `*10*` arrangements
