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
