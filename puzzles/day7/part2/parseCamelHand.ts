import { CamelHand, CamelHandType } from './type'

export const parseCamelHand = (input: string): CamelHand[] => {
  const lines = input.split('\n').filter((x) => !!x)

  return lines.map((line) => {
    const parts = line.split(' ')
    const cards = parts[0]
    const bid = +parts[1]
    const wildCards = parseWildCards(cards)

    return {
      cards,
      wildCards,
      bid,
      type: calculateHandType(cards),
      wildType: calculateHandType(wildCards),
    }
  })
}

export const parseWildCards = (cards: string): string => {
  const cardArr = cards.split('')
  let wildCards = ''

  const groupedCards = groupCardsByLikeness(cardArr).sort(
    (a, b) => b.length - a.length
  )

  const mostPopularCard = () => {
    const mostFrequentNumber = groupedCards[0][0]
    if (mostFrequentNumber === 'J' && !!groupedCards[1] && !!groupedCards[1][0])
      return groupedCards[1][0]

    return mostFrequentNumber
  }

  cardArr.forEach((card) => {
    if (card === 'J') wildCards += mostPopularCard()
    else wildCards += card
  })
  return wildCards
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
