import { NumberResults, numbers } from './NumberKey'

export const getCombinedNumber2 = (line: string) => {
  const lowerCaseLine = line.toLowerCase()
  const firstNumber = getNum(
    buildFirstCandidates(lowerCaseLine),
    (a: NumberResults, b: NumberResults) => a.index - b.index
  )
  const lastNumber = getNum(
    buildLastCandidates(lowerCaseLine),
    (a: NumberResults, b: NumberResults) => b.index - a.index
  )
  return +`${firstNumber}${lastNumber}`
}

const getNum = (
  candidates: NumberResults[],
  sorter: (a: NumberResults, b: NumberResults) => number
) => {
  const item = candidates.filter((c) => c.index !== -1).sort(sorter)
  return item[0].key.short
}

const buildFirstCandidates = (line: string) => {
  return numbers.map((num) => {
    const shortIndex = line.indexOf(num.short)
    const longIndex = line.indexOf(num.long)

    const getIndex = () => {
      if (shortIndex === -1 && longIndex > -1) return longIndex
      if (longIndex === -1 && shortIndex > -1) return shortIndex
      return shortIndex < longIndex ? shortIndex : longIndex
    }

    return {
      key: num,
      index: getIndex(),
    }
  })
}

const buildLastCandidates = (line: string) => {
  return numbers.map((num) => {
    const shortIndex = line.lastIndexOf(num.short)
    const longIndex = line.lastIndexOf(num.long)

    const getIndex = () => {
      if (shortIndex === -1 && longIndex > -1) return longIndex
      if (longIndex === -1 && shortIndex > -1) return shortIndex
      return shortIndex > longIndex ? shortIndex : longIndex
    }

    return {
      key: num,
      index: getIndex(),
    }
  })
}
