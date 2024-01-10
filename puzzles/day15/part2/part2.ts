type Lense = {
  id: string
  focalLength: number
}

export const day15Part2 = (input: string) => {
  const steps = input.trim().split(',')
  const boxSeries = makeBoxSeries()
  boxSeries[0].push({ id: 'h', focalLength: 3 })
  console.log(boxSeries[0])
}

export const makeBoxSeries = (): Lense[][] => {
  const boxSeries: Lense[][] = []
  for (let i = 0; i < 256; i++) boxSeries.push([])
  return boxSeries
}
