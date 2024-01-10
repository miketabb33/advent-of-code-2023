export const day15Part2 = (input: string) => {
  const steps = input.trim().split(',')
  let sum = 0
  steps.forEach((step) => (sum += calculateStep(step)))
  return sum
}

export const calculateStep = (step: string): number => {
  let currentValue = 0
  step.split('').forEach((char) => {
    currentValue += char.charCodeAt(0)
    currentValue *= 17
    currentValue %= 256
  })
  return currentValue
}
