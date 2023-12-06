import { parseInputIntoBoatRaces } from './parseInputIntoBoatRaces'

export const day6Answer2 = (input: string): number => {
  const boatRace = parseInputIntoBoatRaces(input)
  return boatRace.winningOptions.length
}
