import { parseAlmanacSections } from './parseAlmanacSections'
import { parseSeedSection } from './parseSeedSection'
import { processAlmanacSeed } from './processAlmanacSeed'
import { AlmanacSections, AlmanacSeed } from './types'

export const day5Answer2Async = async (input: string) => {
  const allSections = input.split('\n\n')
  const seedSection = allSections[0]
  const restOfSections = allSections.slice(1)

  const almanacSeeds = parseSeedSection(seedSection)
  const almanacSections = parseAlmanacSections(restOfSections)

  const promises: Promise<number>[] = []

  almanacSeeds.forEach((almanacSeed) => {
    promises.push(batchRunAlmanacSeed(almanacSeed, almanacSections))
  })

  const results = await Promise.all(promises)

  return results.sort((a, b) => a - b)[0]
}

const batchRunAlmanacSeed = async (
  almanacSeed: AlmanacSeed,
  almanacSections: AlmanacSections
) => {
  const batchSize = 50
  const promises: Promise<number>[] = []
  for (let i = 0; i <= batchSize; i++) {
    const promise = new Promise<number>((res, rej) => {
      console.log(`batch ${i} started`)
      const number = processAlmanacSeed({
        almanacSeed,
        almanacSections,
        batchSize,
        batchStart: i,
      }).sort((a, b) => a - b)[0]
      res(number)
    })
    promises.push(promise)
  }
  const result = await Promise.all(promises)
  return result.sort((a, b) => a - b)[0]
}
