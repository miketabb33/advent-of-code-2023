import { ScratchOff } from './type'

type MakeScratchOffArgs = {
  cardId?: number
  winningNumbers?: number[]
  existingNumbers?: number[]
  matches?: number[]
  worth?: number
}

export const makeScratchOff = ({
  cardId = 0,
  winningNumbers = [],
  existingNumbers = [],
  matches = [],
  worth = 0,
}: MakeScratchOffArgs): ScratchOff => ({
  cardId,
  winningNumbers,
  existingNumbers,
  matches,
  worth,
})
