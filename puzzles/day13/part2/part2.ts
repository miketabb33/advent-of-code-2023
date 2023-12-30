type MirrorResult = {
  row: number
  column: number
}

export const day13Part2 = (input: string): number => {
  const result: MirrorResult = { row: 0, column: 0 }
  const patterns = parseMirrorPatterns(input)

  patterns.forEach((pattern) => {
    const mr = getMirrorResult(pattern)
    result.row += mr.row
    result.column += mr.column
  })

  return result.row * 100 + result.column
}

export const parseMirrorPatterns = (input: string): string[][] => {
  const patterns: string[][] = []
  input
    .split('\n\n')
    .filter((x) => !!x)
    .forEach((x) => patterns.push(x.split('\n').filter((y) => !!y)))
  return patterns
}

export const getMirrorResult = (pattern: string[]): MirrorResult => {
  //Row
  const rowCandidates = findMirrorCandidate(pattern)
  for (let i = 0; i < rowCandidates.length; i++) {
    const rowCandidate = rowCandidates[i]
    if (isMirrorValid(pattern, rowCandidate))
      return { row: rowCandidate, column: 0 }
  }

  //Column
  const rotatedPattern = rotatePattern(pattern)
  const columnCandidates = findMirrorCandidate(rotatedPattern)

  for (let j = 0; j < columnCandidates.length; j++) {
    const columnCandidate = columnCandidates[j]
    if (isMirrorValid(rotatedPattern, columnCandidate))
      return { row: 0, column: columnCandidate }
  }

  throw new Error(`Could not find reflection\n${pattern}`)
}

export const findMirrorCandidate = (pattern: string[]): number[] => {
  const candidates: number[] = []
  for (let i = 0; i < pattern.length; i++) {
    const currentRow = pattern[i]
    const nextRow = pattern[i + 1]
    if (!nextRow) break

    if (currentRow === nextRow) candidates.push(i + 1)
  }
  return candidates
}

export const rotatePattern = (pattern: string[]): string[] => {
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

export const isMirrorValid = (pattern: string[], result: number): boolean => {
  let upPassIndex = result - 1
  let downPassIndex = result

  let isLooping = true

  while (isLooping) {
    upPassIndex -= 1
    downPassIndex += 1

    const upLine = pattern[upPassIndex]
    const downLine = pattern[downPassIndex]

    if (upLine === undefined || downLine === undefined) return true
    if (upLine !== downLine) return false
  }

  return false
}
