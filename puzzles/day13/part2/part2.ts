type MirrorResult = {
  row: number
  column: number
}

type MirrorCandidate = {
  index: number
  smudgeInFirstRow: boolean
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
      return { row: rowCandidate.index, column: 0 }
  }

  //Column
  const rotatedPattern = rotatePattern(pattern)
  const columnCandidates = findMirrorCandidate(rotatedPattern)

  for (let j = 0; j < columnCandidates.length; j++) {
    const columnCandidate = columnCandidates[j]
    if (isMirrorValid(rotatedPattern, columnCandidate))
      return { row: 0, column: columnCandidate.index }
  }

  throw new Error(`Could not find reflection\n${pattern}`)
}

export const findMirrorCandidate = (pattern: string[]): MirrorCandidate[] => {
  const candidates: MirrorCandidate[] = []
  for (let i = 0; i < pattern.length; i++) {
    const currentRow = pattern[i]
    const nextRow = pattern[i + 1]
    if (!nextRow) break

    const differenceCount = getDifferenceCount(currentRow, nextRow)

    if (currentRow === nextRow)
      candidates.push({ index: i + 1, smudgeInFirstRow: false })
    else if (differenceCount === 1)
      candidates.push({ index: i + 1, smudgeInFirstRow: true })
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

export const isMirrorValid = (
  pattern: string[],
  result: MirrorCandidate
): boolean => {
  let upPassIndex = result.index - 1
  let downPassIndex = result.index

  let isLooping = true

  let smudgeCandidates = 0

  while (isLooping) {
    upPassIndex -= 1
    downPassIndex += 1

    const upLine = pattern[upPassIndex]
    const downLine = pattern[downPassIndex]

    if (upLine === undefined || downLine === undefined) break

    const differentCount = getDifferenceCount(upLine, downLine)

    if (differentCount <= 1) smudgeCandidates += differentCount
    else smudgeCandidates += 2
  }

  if (result.smudgeInFirstRow && smudgeCandidates === 0) return true
  if (!result.smudgeInFirstRow && smudgeCandidates === 1) return true
  return false
}

const getDifferenceCount = (line1: string, line2: string) => {
  let differentCount = 0
  line1.split('').forEach((item1, i) => {
    const downItem = line2[i]
    if (item1 !== downItem) differentCount++
  })
  return differentCount
}
