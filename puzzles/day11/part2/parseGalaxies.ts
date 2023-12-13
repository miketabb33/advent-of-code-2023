import { GalaxyPosition, VoidPositions } from './types'

export const parseIntoMatrix = (input: string): string[][] => {
  const lines = input.split('\n').filter((x) => !!x)
  return lines.map((line) => line.split(''))
}

export const findGalaxies = (matrix: string[][]): GalaxyPosition[] => {
  const galaxies: GalaxyPosition[] = []

  matrix.forEach((line, rowIndex) => {
    line.forEach((item, columnIndex) => {
      if (item === '#') galaxies.push({ rowIndex, columnIndex })
    })
  })
  return galaxies
}

export const findVoids = (matrix: string[][]): VoidPositions => ({
  rowIndexes: findRowVoids(matrix),
  columnIndexes: findColumnVoids(matrix),
})

const findRowVoids = (matrix: string[][]): number[] => {
  let numbers: number[] = []
  matrix.map((line, i) => {
    if (isVoid(line)) numbers.push(i)
  })
  return numbers
}

const findColumnVoids = (matrix: string[][]): number[] => {
  let numbers: number[] = []
  matrix[0].forEach((_, i) => {
    const column = matrix.map((line) => line[i])
    if (isVoid(column)) numbers.push(i)
  })
  return numbers
}

const isVoid = (collection: string[]) =>
  collection.every((item) => item === '.')
