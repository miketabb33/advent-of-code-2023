import { CamelHand } from './type'

export const separateHands = (hands: CamelHand[]): CamelHand[][] => {
  const highCards: CamelHand[] = []
  const onePair: CamelHand[] = []
  const twoPairs: CamelHand[] = []
  const threeOfKind: CamelHand[] = []
  const fullHouse: CamelHand[] = []
  const fourOfKind: CamelHand[] = []
  const fiveOfKind: CamelHand[] = []

  hands.forEach((hand) => {
    if (hand.type === 'highCard') highCards.push(hand)
    if (hand.type === '1pair') onePair.push(hand)
    if (hand.type === '2pairs') twoPairs.push(hand)
    if (hand.type === '3ofKind') threeOfKind.push(hand)
    if (hand.type === 'fullHouse') fullHouse.push(hand)
    if (hand.type === '4ofKind') fourOfKind.push(hand)
    if (hand.type === '5ofKind') fiveOfKind.push(hand)
  })

  return [
    highCards,
    onePair,
    twoPairs,
    threeOfKind,
    fullHouse,
    fourOfKind,
    fiveOfKind,
  ]
}

export const sortHands = (hands: CamelHand[]): CamelHand[] => {
  return hands.sort((a, b) => {
    for (let i = 0; i < 5; i++) {
      const result = sortValue(a.cards[i], b.cards[i])
      if (result === 0) continue
      return result
    }
    return 0
  })
}

const sortValue = (a: string, b: string) => {
  const valA = assignSortValue(a)
  const valB = assignSortValue(b)
  return valA - valB
}

export const assignSortValue = (value: string): number => {
  if (!isNaN(+value)) return +value
  if (value === 'T') return 10
  if (value === 'J') return 11
  if (value === 'Q') return 12
  if (value === 'K') return 13
  if (value === 'A') return 14
  return 0
}
