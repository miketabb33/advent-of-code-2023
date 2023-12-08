import { NetworkNode as NetworkNode } from './types'

export const parseNetworkNodes = (raw: string): NetworkNode[] => {
  const lines = raw.split('\n').filter((x) => !!x)
  return lines.map((line, i) => {
    const splitEquals = line.split(' = ')
    if (splitEquals.length !== 2) throw new Error(`Could not split line ${i}`)

    const lr = splitEquals[1].replace(/\(|\)/g, '').split(',')

    const item: NetworkNode = {
      origin: splitEquals[0],
      left: lr[0].trim(),
      right: lr[1].trim(),
    }
    return item
  })
}
