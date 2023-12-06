import { BoatRace } from '../types'

export const parseInputIntoBoatRaces = (input: string): BoatRace[] => {
  const line = input.split('\n')
  if (!line[0]) return []
  if (!line[1]) return []

  const timeArr = extractValue(line[0], 'Time:')
  const distArr = extractValue(line[1], 'Distance:')

  return timeArr.map((time, i) => {
    const boatRace: BoatRace = {
      milliseconds: +time,
      millimeters: +distArr[i],
    }
    return boatRace
  })
}

const extractValue = (line: string, key: string) => {
  return line
    .replace(key, '')
    .split(' ')
    .filter((x) => !!x)
}
