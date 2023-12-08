import { parseCamelHand } from './parseCamelHand'
import { separateWildHands, sortHands } from './rankCards'
import { CamelHand } from './type'

export const day7Part2 = (input: string) => {
  const camelCards = parseCamelHand(input)
  const separatedHands = separateWildHands(camelCards)
  const sortedHands = separatedHands.map((hand) => sortHands(hand))

  const flatMap: CamelHand[] = []
  sortedHands.forEach((group) => {
    if (group.length === 0) return
    flatMap.push(...group)
  })

  const totalWinnings = flatMap
    .map((x) => x.bid)
    .reduce((prevWinnings, current, i) => {
      if (isNaN(current)) console.log(i)
      const rank = i + 1
      const currentWinnings = current * rank
      return prevWinnings + currentWinnings
    }, 0)

  return totalWinnings
}
