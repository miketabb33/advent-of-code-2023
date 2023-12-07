import { seedMapper } from './seedMapper'
import { AlmanacSections, AlmanacSeed } from './types'

type ProcessAlmanacSeedArgs = {
  almanacSeed: AlmanacSeed
  almanacSections: AlmanacSections
  batchSize?: number
  batchStart?: number
}

export const processAlmanacSeed = ({
  almanacSeed,
  almanacSections,
  batchSize = 1,
  batchStart = 0,
}: ProcessAlmanacSeedArgs) => {
  const locations: number[] = []
  const start = almanacSeed.start + batchStart
  const end = almanacSeed.start + almanacSeed.length
  for (let i = start; i < end; i += batchSize) {
    const seed = i
    const location = seedMapper(seed, almanacSections)
    locations.push(location)
  }

  return locations.filter((location) => !!location)
}
