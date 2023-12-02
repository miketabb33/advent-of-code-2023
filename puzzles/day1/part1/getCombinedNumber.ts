export const getCombinedNumber1 = (line: string) => {
  const firstNumber = findFirstNumber(line)
  const lastNumber = findLastNumber(line)
  return +`${firstNumber}${lastNumber}`
}

const findFirstNumber = (input: string) => {
  for (let i = 0; i < input.length; i++) {
    const numberCandidate = getWhenNumber(input, i)
    if (numberCandidate) {
      return numberCandidate
    }
  }
  return 0
}

const findLastNumber = (input: string) => {
  for (let i = input.length - 1; i >= 0; i--) {
    const numberCandidate = getWhenNumber(input, i)
    if (numberCandidate) {
      return numberCandidate
    }
  }
  return 0
}

const getWhenNumber = (input: string, index: number) => {
  const numberCandidate = +input[index]
  if (!isNaN(numberCandidate)) return numberCandidate
}
