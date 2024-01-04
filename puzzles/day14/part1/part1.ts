import { rotateClockwise } from '../../../utils'

export const day14Part1 = (input: string) => {
  const lines = input.split('\n').filter((x) => !!x)
  const rotated = rotateClockwise(lines)

  return `Ready, solve that puzzle! Input: ${lines}`
}

export const tiltLine = (line: string) => {
  const lineArr = line.split('')

  let isLooping = true
  while (isLooping) {
    const index = lineArr.indexOf('O')
    if (index === -1) break
    const rollResult = rollOBy1(lineArr, index)
    isLooping = rollResult
  }

  return lineArr.join('')
}

const rollOBy1 = (lineArr: string[], index: number): boolean => {
  if (lineArr[index + 1] === '.') {
    lineArr[index] = lineArr.splice(index + 1, 1, lineArr[index])[0]
    return true
  }
  return false
}
