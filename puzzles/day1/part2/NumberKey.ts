export type NumberResults = {
  key: NumberKey
  index: number
}

type NumberKey = {
  long: string
  short: string
}

const one: NumberKey = {
  long: 'one',
  short: '1',
}
const two: NumberKey = {
  long: 'two',
  short: '2',
}
const three: NumberKey = {
  long: 'three',
  short: '3',
}
const four: NumberKey = {
  long: 'four',
  short: '4',
}
const five: NumberKey = {
  long: 'five',
  short: '5',
}
const six: NumberKey = {
  long: 'six',
  short: '6',
}
const seven: NumberKey = {
  long: 'seven',
  short: '7',
}
const eight: NumberKey = {
  long: 'eight',
  short: '8',
}
const nine: NumberKey = {
  long: 'nine',
  short: '9',
}

export const numbers = [one, two, three, four, five, six, seven, eight, nine]
