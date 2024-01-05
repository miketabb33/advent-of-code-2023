import { rotateClockwise } from '../../../utils'

export const day14Part1 = (input: string): number => {
  const lines = input.split('\n').filter((x) => !!x)
  const rotatedLines = rotateClockwise(lines)

  let sum = 0

  rotatedLines.forEach((line) => {
    const tiltedLine = tiltLine(line)
    sum += calculateLoad(tiltedLine)
  })

  return sum
}

export const calculateLoad = (line: string): number => {
  let sum = 0
  line.split('').forEach((x, i) => {
    if (x === 'O') sum += i + 1
  })
  return sum
}

export const tiltLine = (line: string) => {
  const lineArr = line.split('')
  for (let i = line.length - 1; i >= 0; i--) {
    if (line[i] === 'O') rollUntilUnable(lineArr, i)
  }
  return lineArr.join('')
}

const rollUntilUnable = (lineArr: string[], index: number) => {
  let isLooping = true
  while (isLooping) {
    isLooping = rollOBy1(lineArr, index)
    index++
  }
}

const rollOBy1 = (lineArr: string[], index: number): boolean => {
  if (lineArr[index + 1] === '.') {
    lineArr[index] = lineArr.splice(index + 1, 1, lineArr[index])[0]
    return true
  }
  return false
}
