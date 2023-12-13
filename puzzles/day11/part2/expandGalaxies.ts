export const parseIntoMatrix = (input: string): string[][] => {
  const lines = input.split('\n').filter((x) => !!x)
  return lines.map((line) => line.split(''))
}

export const expandGalaxies = (matrix: string[][]): string[][] => {
  const rowVoids = findRowVoids(matrix)
  const columnVoids = findColumnVoids(matrix)

  const matrixWithRows = addVoidRows(matrix, rowVoids)
  const matrixWithColumns = addVoidColumns(matrixWithRows, columnVoids)

  return matrixWithColumns
}

const addVoidRows = (matrix: string[][], rowVoids: number[]): string[][] => {
  const newMatrix = [...matrix]
  const sortedVoidRows = rowVoids.sort((a, b) => b - a)

  sortedVoidRows.forEach((rowIndex) => {
    for (let i = 0; i < rowIndex + 1_000_000; i++) {
      newMatrix.splice(
        rowIndex + i,
        0,
        newMatrix[0].map((_) => '.')
      )
    }
  })

  return newMatrix
}

const addVoidColumns = (
  matrix: string[][],
  columnVoids: number[]
): string[][] => {
  const newMatrix = [...matrix]
  const sortedVoidColumns = columnVoids.sort((a, b) => b - a)

  sortedVoidColumns.forEach((columnIndex) => {
    for (let i = 0; i < columnIndex + 1_000_000; i++) {
      newMatrix.forEach((line) => {
        line.splice(columnIndex + i, 0, '.')
      })
    }
  })

  return newMatrix
}

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
