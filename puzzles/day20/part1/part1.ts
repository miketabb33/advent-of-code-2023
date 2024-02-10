import { PulseParser } from './pulseParser.test'

export type Pulse = {
  type: 'high' | 'low'
  destination: string
}

export const day20Part1 = (input: string) => {
  const parser = new PulseParser()
  const moduleMap = parser.parse(input)

  const broadcaster = moduleMap.get('broadcaster')!
  console.log(broadcaster)

  return `Ready, solve that puzzle! Input: `
}
