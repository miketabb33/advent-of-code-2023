export type LenseRemoval = {
  id: string
  operator: '-'
}

export type Lense = {
  id: string
  focalLength: number
  operator: '='
}

type ParsedStep = LenseRemoval | Lense

export const day15Part2 = (input: string): number => {
  const steps = input.trim().split(',')
  const boxSeries = processLenseSteps(steps)

  let total = 0

  boxSeries.forEach((box, i) => {
    let sum = 0
    box.forEach((lense, j) => {
      sum += lense.focalLength * (j + 1) * (i + 1)
    })

    total += sum
  })

  return total
}

export const processLenseSteps = (steps: string[]): Lense[][] => {
  const boxSeries = makeBoxSeries()

  steps.forEach((step) => {
    const parsedStep = parseStep(step)
    const boxId = hashAlgorithm(parsedStep.id)

    if (parsedStep.operator === '=') {
      const existingLense = boxSeries[boxId].find((x) => x.id === parsedStep.id)
      if (existingLense) {
        existingLense.focalLength = parsedStep.focalLength
      } else {
        boxSeries[boxId].push(parsedStep)
      }
    } else if (parsedStep.operator === '-') {
      boxSeries[boxId] = boxSeries[boxId].filter((x) => x.id !== parsedStep.id)
    }
  })

  return boxSeries
}

export const parseStep = (step: string): ParsedStep => {
  if (step.includes('=')) {
    const idAndFocalLength = step.split('=')
    return {
      focalLength: +idAndFocalLength[1],
      operator: '=',
      id: idAndFocalLength[0],
    }
  }

  if (step.includes('-')) {
    const id = step.split('-')
    return {
      operator: '-',
      id: id[0],
    }
  }

  throw new Error(`${step} is invalid`)
}

export const makeBoxSeries = (): Lense[][] => {
  const boxSeries: Lense[][] = []
  for (let i = 0; i < 256; i++) boxSeries.push([])
  return boxSeries
}

export const hashAlgorithm = (step: string): number => {
  let currentValue = 0
  step.split('').forEach((char) => {
    currentValue += char.charCodeAt(0)
    currentValue *= 17
    currentValue %= 256
  })
  return currentValue
}
