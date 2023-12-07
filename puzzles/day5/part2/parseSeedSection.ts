import { AlmanacSeed } from './types'

export const parseSeedSection = (seedInput: string): AlmanacSeed[] => {
  const seedArray = seedInput
    .replace('seeds: ', '')
    .split(' ')
    .map((seed) => +seed)

  const seeds: AlmanacSeed[] = []

  let startCache = -1

  for (let i = 0; i < seedArray.length; i++) {
    if (i % 2) {
      const seed: AlmanacSeed = { start: startCache, length: seedArray[i] }
      seeds.push(seed)
    } else {
      startCache = seedArray[i]
    }
  }

  return seeds
}
