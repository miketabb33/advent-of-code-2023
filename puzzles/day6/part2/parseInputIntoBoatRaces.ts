import { BoatRace } from '../types'

export const parseInputIntoBoatRaces = (input: string): BoatRace => {
  const line = input.split('\n')

  const milliseconds = +extractValue(line[0], 'Time:')
  const millimeters = +extractValue(line[1], 'Distance:')

  const options = parseOptions(milliseconds)

  const boatRace: BoatRace = {
    milliseconds,
    millimeters,
    options,
    winningOptions: parseWinningOptions(options, millimeters),
  }
  return boatRace
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
    .join('')
}
