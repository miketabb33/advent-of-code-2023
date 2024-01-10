import { rotateClockwise } from '../../../utils'

export const day14Part2 = (input: string): number => {
  const lines = input.split('\n').filter((x) => !!x)

  // only needed to run 1_000 times to get the correct answer
  const cycle = cyclePlatformTimes(lines, 1_000)

  return calculatePlatformLoad(rotateClockwise(cycle))
}

export const cyclePlatformTimes = (
  lines: string[],
  times: number
): string[] => {
  let result = lines
  for (let i = 0; i < times; i++) {
    result = cyclePlatform(result)
  }
  return result
}

const cyclePlatform = (lines: string[]): string[] => {
  const _90Deg = rotateClockwise(lines).map(tiltLine)
  const _180Deg = rotateClockwise(_90Deg).map(tiltLine)
  const _270Deg = rotateClockwise(_180Deg).map(tiltLine)
  const _360Deg = rotateClockwise(_270Deg).map(tiltLine)
  return _360Deg
}

const calculatePlatformLoad = (lines: string[]) => {
  let sum = 0
  lines.forEach((line) => {
    sum += calculateLoad(line)
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
