import { parseInputIntoBoatRaces } from './parseInputIntoBoatRaces'

export const day6Answer1 = (input: string): number => {
  const boatRaces = parseInputIntoBoatRaces(input)
  const totalWinsOptionsPerRace = boatRaces.map((x) => x.winningOptions.length)
  return totalWinsOptionsPerRace.reduce((p, c) => p * c, 1)
}
