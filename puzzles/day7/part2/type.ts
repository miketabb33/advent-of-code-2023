export type CamelHandType =
  | '5ofKind'
  | '4ofKind'
  | 'fullHouse'
  | '3ofKind'
  | '2pairs'
  | '1pair'
  | 'highCard'

export type CamelHand = {
  cards: string
  wildCards: string
  bid: number
  type: CamelHandType
  wildType: CamelHandType
}
