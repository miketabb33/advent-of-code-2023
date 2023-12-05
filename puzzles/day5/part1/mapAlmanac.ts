import { Almanac, AlmanacMap } from '../types'

export const mapAlmanac = (almanac: Almanac) => {
  const soilToSeedResults = findCorrespondingNumbersForSection(
    almanac.seeds,
    almanac.seedToSoil
  )
  console.log(soilToSeedResults)
}

export const findCorrespondingNumbersForSection = (
  targets: number[],
  mapper: AlmanacMap[]
) => {
  return targets.map((target) =>
    findCorrespondingNumberFromMaps(target, mapper)
  )
}

export const findCorrespondingNumberFromMaps = (
  target: number,
  mapper: AlmanacMap[]
) => {
  let results: number[] = []

  mapper.forEach((map) => {
    const result = findCorrespondingNumberFromMap(target, map)
    if (result !== target) results.push(result)
  })

  return results.length === 0 ? target : results[0]
}

export const findCorrespondingNumberFromMap = (
  target: number,
  mapper: AlmanacMap
): number => {
  const sourceIndex = mapper.sourceRange.indexOf(target)
  if (sourceIndex !== -1) return mapper.destinationRange[sourceIndex]
  return target
}
