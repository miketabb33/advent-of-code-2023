import { Connection, Module } from './modules'
import { PulseParser } from './pulseParser.test'

export const day20Part1 = (input: string) => {
  const parser = new PulseParser()
  const moduleMap = parser.parse(input)

  let lowPulses = 1
  let highPulses = 0

  let connections: Connection[] = [
    { pulse: 'low', input: 'button', destination: 'broadcaster' },
  ]

  while (connections.length > 0) {
    const newConnections: Connection[] = []
    connections.forEach((connection) => {
      const module = moduleMap.get(connection.destination)
      if (!module)
        throw new Error(`Missing module for: ${JSON.stringify(connection)}`)
      const result = module.process(connection.pulse, connection.input)
      result.forEach((c) => {
        console.log(c)
        if (c.pulse === 'low') lowPulses += 1
        if (c.pulse === 'high') highPulses += 1
        newConnections.push(c)
      })
    })
    connections = newConnections
  }

  return lowPulses * highPulses * 1_000_000
}
