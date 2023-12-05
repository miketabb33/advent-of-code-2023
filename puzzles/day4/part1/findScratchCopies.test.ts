import { describe, expect, it } from 'bun:test'
import { ScratchOff } from '../type'
import { makeScratchOff } from '../makeScratchOff.mock'
import {
  findScratchCopies,
  getCopiesForSingleScratch,
} from './findScratchCopies'

describe('Find Scratch Copies', () => {
  it('should replicate example', () => {
    const card1 = makeScratchOff({ cardId: 1, matches: [1, 2, 3, 4] })
    const card2 = makeScratchOff({ cardId: 2, matches: [1, 2] })
    const card3 = makeScratchOff({ cardId: 3, matches: [1, 2] })
    const card4 = makeScratchOff({ cardId: 4, matches: [1] })
    const card5 = makeScratchOff({ cardId: 5, matches: [] })
    const card6 = makeScratchOff({ cardId: 6, matches: [] })
    const scratchOffs = [card1, card2, card3, card4, card5, card6]
    expect(findScratchCopies(scratchOffs)).toEqual(30)
  })
})

describe('Get Copies For Single Scratch', () => {
  const allScratches = new Array(100)
    .fill(false)
    .map((_, i) => makeScratchOff({ cardId: i + 1 }))

  it('should return an empty array when no matches exist', () => {
    const scratchOff: ScratchOff = makeScratchOff({ matches: [] })
    expect(getCopiesForSingleScratch(scratchOff, allScratches)).toEqual([])
  })

  it('should return the next 2 cards after a card with 2 matches and id of 1', () => {
    const scratchOff: ScratchOff = makeScratchOff({
      cardId: 1,
      matches: [23, 12],
    })

    const results = getCopiesForSingleScratch(scratchOff, allScratches)
    expect(results.length).toEqual(2)
    expect(results[0].cardId).toEqual(2)
    expect(results[1].cardId).toEqual(3)
  })

  it('should return the next  cards after card 1', () => {
    const scratchOff: ScratchOff = makeScratchOff({
      cardId: 54,
      matches: [23, 12, 21, 41, 43, 21],
    })

    const results = getCopiesForSingleScratch(scratchOff, allScratches)
    expect(results.length).toEqual(6)
    expect(results[0].cardId).toEqual(55)
    expect(results[1].cardId).toEqual(56)
    expect(results[2].cardId).toEqual(57)
    expect(results[3].cardId).toEqual(58)
    expect(results[4].cardId).toEqual(59)
    expect(results[5].cardId).toEqual(60)
  })
})
