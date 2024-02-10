import {
  BroadcasterModule,
  ConjunctionModule,
  FlipFlopModule,
  Module,
} from './modules'

export class PulseParser {
  parse = (input: string): Map<string, Module> => {
    const lines = input.split('\n').filter((x) => !!x)
    const modulesArray = lines.map(this.parseLine)
    const modulesMap = new Map<string, Module>()

    modulesArray.forEach((module) => {
      modulesMap.set(module.id, module)
    })

    return modulesMap
  }

  private parseLine = (line: string) => {
    const typeNameAndDestinations = line.split('->')
    const typeName = typeNameAndDestinations[0].trim()
    const destinations = typeNameAndDestinations[1].trim()
    const destinationsArr = destinations.split(',').map((x) => x.trim())

    if (typeName.includes('broadcaster')) {
      return new BroadcasterModule(destinationsArr)
    }

    if (typeName.startsWith('%'))
      return new FlipFlopModule(
        typeName.substring(1, typeName.length),
        destinationsArr
      )

    if (typeName.startsWith('&')) {
      return new ConjunctionModule(
        typeName.substring(1, typeName.length),
        destinationsArr
      )
    }

    throw new Error(`Line could not be parsed: ${line}`)
  }
}
