import { ScratchOff } from '../type'

export const findScratchCopies = (allScratchOffs: ScratchOff[]): number => {
  const listWithCopies = [...allScratchOffs]

  let i = 0
  while (i < listWithCopies.length) {
    const currentScratch = listWithCopies[i]
    const copies = getCopiesForSingleScratch(currentScratch, allScratchOffs)
    copies.forEach((copy) => listWithCopies.push(copy))
    i++
  }
  return listWithCopies.length
}

export const getCopiesForSingleScratch = (
  scratchOff: ScratchOff,
  allScratches: ScratchOff[]
): ScratchOff[] => {
  const copies: ScratchOff[] = []
  const startIndex = scratchOff.cardId
  const endIndex = startIndex + scratchOff.matches.length

  for (let i = startIndex; i < endIndex; i++) {
    if (!allScratches[i]) continue
    copies.push(allScratches[i])
  }

  return copies
}
