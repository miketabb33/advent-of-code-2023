import { SpringRow } from './types'

export const parseSprings = (input: string): SpringRow[] => {
  const lines = input.split('\n').filter((x) => !!x)
  return lines.map(parseSpring)
}

const parseSpring = (line: string): SpringRow => {
  const springsAndGroups = line.split(' ')
  const groups = springsAndGroups[1].trim().split(',').map(Number)
  return {
    springs: springsAndGroups[0].trim(),
    groups,
  }
}

export const findSpringArrangements = (row: SpringRow): number => {
  const candidates = row.springs.split('.').filter((x) => !!x)
  if (candidates.length === row.groups.length) {
    return calcArrangements(candidates, row.groups)
  }
  return 0 //1
}

const calcArrangements = (candidates: string[], groups: number[]) => {
  let arrangements = 0

  groups.forEach((group, i) => {
    const candidate = candidates[i]
    arrangements += group / unknownCount(candidate)
  })
  return arrangements
}

const unknownCount = (group: string) => {
  return group.split('').filter((x) => x === '?').length
}

const allBroken = (group: string) => {
  return group.split('').every((x) => x === '#')
}
