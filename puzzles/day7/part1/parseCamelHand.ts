import { CamelHand, CamelHandType } from './type'

export const parseCamelHand = (input: string): CamelHand[] => {
  const lines = input.split('\n').filter((x) => !!x)

  return lines.map((line) => {
    const parts = line.split(' ')
    const cards = parts[0]
    const bid = +parts[1]
    return {
      cards,
      bid,
      type: calculateHandType(cards),
    }
  })
}

export const calculateHandType = (cards: string): CamelHandType => {
  const setCards = new Set(cards)
  const arrCards = cards.split('')

  if (setCards.size === 1) return '5ofKind'

  if (setCards.size === 2) {
    const test = arrCards.filter((i) => i === arrCards[0])
    if (test.length === 2 || test.length === 3) return 'fullHouse'
    return '4ofKind'
  }

  if (setCards.size === 3) {
    const groups = groupCardsByLikeness(arrCards)
    const handHas3ofKind =
      groups[0].length === 3 || groups[1].length === 3 || groups[2].length === 3

    if (handHas3ofKind) return '3ofKind'
    return '2pairs'
  }

  if (setCards.size === 4) return '1pair'

  return 'highCard'
}

const groupCardsByLikeness = (arrCards: string[]) => {
  const cache: string[][] = []
  arrCards.forEach((card) => {
    let added = false
    cache.forEach((group) => {
      if (group[0] === card) {
        group.push(card)
        added = true
      }
    })
    if (!added) cache.push([card])
  })
  return cache
}
