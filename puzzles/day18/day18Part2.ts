import { writeFileSync } from 'fs'
import { DigMap, DigPlanItem } from './part1/day18Part1'
type Direction = 'up' | 'right' | 'down' | 'left'

export const day18Part2 = (input: string) => {
  const lines = input.split('\n').filter((x) => !!x)
  const digPlan = parseDigPlans2(lines)
  const digMap = DigMap.make(digPlan)
  const printed = digMap.print(digMap.getDigPlanMatrix())

  writeFileSync(`${__dirname}/printed2`, printed.join('\n'))
  return ''
}

export const parseDigPlans2 = (lines: string[]): DigPlanItem[] => {
  const map = new Map<number, Direction>([
    [3, 'up'],
    [0, 'right'],
    [1, 'down'],
    [2, 'left'],
  ])
  return lines.map((line) => {
    const parts = line.split(' ')
    const color = parts[2].substring(2, parts[2].length - 1)
    const first5 = color.substring(0, 5)
    const last = color[color.length - 1]

    return {
      direction: map.get(+last) || 'down',
      meters: parseInt(first5, 16),
      color: parts[2],
    }
  })
}
