export type GalaxyPosition = {
  rowIndex: number
  columnIndex: number
}

export const processGalaxyDistances = (matrix: string[][]): number => {
  const galaxies = findGalaxies(matrix)
  const distances: number[] = []

  const remainingGalaxies = [...galaxies]
  remainingGalaxies.shift()

  galaxies.forEach((focusGalaxy) => {
    remainingGalaxies.forEach((galaxy) => {
      distances.push(findGalaxyDistance(focusGalaxy, galaxy))
    })
    remainingGalaxies.shift()
  })

  return distances.reduce((a, b) => a + b, 0)
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

export const findGalaxyDistance = (a: GalaxyPosition, b: GalaxyPosition) => {
  const columnDistance = a.columnIndex - b.columnIndex
  const rowDistance = a.rowIndex - b.rowIndex
  return Math.abs(columnDistance) + Math.abs(rowDistance)
}
