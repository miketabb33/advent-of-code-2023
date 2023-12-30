type MirrorResult = {
  row: number
  column: number
}

export const day13Part1 = (input: string) => {
  const lines = input.split('\n').filter((x) => !!x)
  return `Ready, solve that puzzle! Input: ${lines[0]}`
}

export const getMirrorResult = (lines: string[]): MirrorResult => {
  const row = findMirror(lines)
  if (row > 0) return { row, column: 0 }
  const column = findMirror(rotatePattern(lines))
  if (column > 0) return { row: 0, column }
  throw new Error('Could not find reflection')
}

export const findMirror = (lines: string[]) => {
  for (let i = 0; i < lines.length; i++) {
    const currentRow = lines[i]
    const nextRow = lines[i + 1]
    if (!nextRow) return -1

    if (currentRow === nextRow) return i + 1
  }
  return -1
}

export const rotatePattern = (lines: string[]): string[] => {
  const rotatedArr: string[] = []

  for (let i = 0; i < lines[0].length; i++) {
    const linePosition = i
    let cache = ''

    for (let j = lines.length - 1; j >= 0; j--) {
      const currentLine = lines[j]
      cache += currentLine[linePosition]
    }
    rotatedArr.push(cache)
  }

  return rotatedArr
}
