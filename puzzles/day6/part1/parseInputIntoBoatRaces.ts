import { BoatRace } from '../types'

export const parseInputIntoBoatRaces = (input: string): BoatRace[] => {
  const line = input.split('\n')
  if (!line[0]) return []
  if (!line[1]) return []

  const timeArr = extractValue(line[0], 'Time:')
  const distArr = extractValue(line[1], 'Distance:')

  return timeArr.map((time, i) => {
    const milliseconds = +time
    const millimeters = +distArr[i]
    const options = parseOptions(milliseconds)

    const boatRace: BoatRace = {
      milliseconds,
      millimeters,
      options,
      winningOptions: parseWinningOptions(options, millimeters),
    }
    return boatRace
  })
}

const parseOptions = (milliseconds: number): number[] => {
  let options: number[] = []

  for (let i = 0; i <= milliseconds; i++) {
    const timeLeft = milliseconds - i
    options.push(timeLeft * i)
  }
  return options
}

const parseWinningOptions = (options: number[], millimeters: number) => {
  return options.filter((option) => option > millimeters)
}

const extractValue = (line: string, key: string) => {
  return line
    .replace(key, '')
    .split(' ')
    .filter((x) => !!x)
}
