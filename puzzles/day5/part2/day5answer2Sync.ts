import { parseAlmanacSections } from './parseAlmanacSections'
import { parseSeedSection } from './parseSeedSection'
import { processAlmanacSeed } from './processAlmanacSeed'

export const day5Answer2Sync = (input: string) => {
  const allSections = input.split('\n\n')
  const seedSection = allSections[0]
  const restOfSections = allSections.slice(1)

  const almanacSeeds = parseSeedSection(seedSection)
  const almanacSections = parseAlmanacSections(restOfSections)

  const batches: number[] = []

  almanacSeeds.forEach((almanacSeed, i) => {
    const locations = processAlmanacSeed({ almanacSeed, almanacSections })
    const lowest = locations.sort((a, b) => a - b)[0]
    batches.push(lowest)
    console.log(`Batch ${i + 1} complete`)
  })

  return batches.sort((a, b) => a - b)[0]
}
