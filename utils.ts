export const rotateClockwise = (pattern: string[]): string[] => {
  const rotatedArr: string[] = []

  for (let i = 0; i < pattern[0].length; i++) {
    const linePosition = i
    let cache = ''

    for (let j = pattern.length - 1; j >= 0; j--) {
      const currentLine = pattern[j]
      cache += currentLine[linePosition]
    }
    rotatedArr.push(cache)
  }

  return rotatedArr
}
