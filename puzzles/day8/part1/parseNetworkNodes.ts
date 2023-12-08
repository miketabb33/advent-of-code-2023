import { NetworkNode as NetworkNode } from './types'

export const parseNetworkNodes = (raw: string): NetworkNode[] => {
  const lines = raw.split('\n')
  return lines.map((line) => {
    const splitEquals = line.split(' = ')
    const lr = splitEquals[1].replace(/\(|\)/g, '').split(',')

    const item: NetworkNode = {
      origin: splitEquals[0],
      left: lr[0].trim(),
      right: lr[1].trim(),
    }
    return item
  })
}
