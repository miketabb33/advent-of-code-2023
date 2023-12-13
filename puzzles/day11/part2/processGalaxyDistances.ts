import { GalaxyPosition, VoidPositions } from './types'

export const processGalaxyDistances = (
  galaxies: GalaxyPosition[],
  voids: VoidPositions,
  expansionAmount: number
): number => {
  const distances: number[] = []

  const remainingGalaxies = [...galaxies]
  remainingGalaxies.shift()

  galaxies.forEach((focusGalaxy) => {
    remainingGalaxies.forEach((galaxy) => {
      distances.push(
        findGalaxyDistance(focusGalaxy, galaxy, voids, expansionAmount)
      )
    })
    remainingGalaxies.shift()
  })

  return distances.reduce((a, b) => a + b, 0)
}

export const findGalaxyDistance = (
  a: GalaxyPosition,
  b: GalaxyPosition,
  voids: VoidPositions,
  expansionAmount: number
) => {
  let rowCrossings = 0
  let columnCrossings = 0

  voids.rowIndexes.forEach((rowIndex) => {
    if (a.rowIndex < b.rowIndex) {
      if (rowIndex > a.rowIndex && rowIndex < b.rowIndex) rowCrossings += 1
    } else {
      if (rowIndex < a.rowIndex && rowIndex > b.rowIndex) rowCrossings += 1
    }
  })

  voids.columnIndexes.forEach((columnIndex) => {
    if (a.columnIndex < b.columnIndex) {
      if (columnIndex > a.columnIndex && columnIndex < b.columnIndex)
        columnCrossings += 1
    } else {
      if (columnIndex < a.columnIndex && columnIndex > b.columnIndex)
        columnCrossings += 1
    }
  })

  const rowExpansion = expansionAmount * rowCrossings
  const columnExpansion = expansionAmount * columnCrossings

  const columnDistance = a.columnIndex - b.columnIndex
  const rowDistance = a.rowIndex - b.rowIndex
  return (
    Math.abs(columnDistance) +
    Math.abs(rowDistance) +
    rowExpansion +
    columnExpansion
  )
}
