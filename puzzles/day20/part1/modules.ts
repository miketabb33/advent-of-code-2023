import { Pulse } from './part1'

export type ModuleType = 'broadcaster' | 'flipflop' | 'conjunction'

export interface Module {
  readonly type: ModuleType
  readonly id: string
  readonly destinations: string[]
  process: (pulse: Pulse[]) => Pulse[]
}

export class BroadcasterModule implements Module {
  readonly type: ModuleType = 'broadcaster'
  readonly id: string = 'broadcaster'
  readonly destinations: string[]

  constructor(destinations: string[]) {
    this.destinations = destinations
  }

  process = (pulse: Pulse[]): Pulse[] => {
    return this.destinations.map((dest) => {
      return { type: pulse[0].type, destination: dest }
    })
  }
}

export class FlipFlopModule implements Module {
  readonly type: ModuleType = 'flipflop'
  readonly id: string
  readonly destinations: string[]

  constructor(id: string, destinations: string[]) {
    this.destinations = destinations
    this.id = id
  }

  process = (pulse: Pulse[]): Pulse[] => {
    return []
  }
}

export class ConjunctionModule implements Module {
  readonly type: ModuleType = 'conjunction'
  readonly id: string
  readonly destinations: string[]

  constructor(id: string, destinations: string[]) {
    this.destinations = destinations
    this.id = id
  }

  process = (pulse: Pulse[]): Pulse[] => {
    return []
  }
}

// flip flop module (%):
// inits off
// on receive
//   if high - nothing happens
//   if low it flips and
//     if off - sends a high pulse

// conjunction module (&):
// default to low
// remembers the most recent pulse type for each of he connected modules.
// on receive
//  updates its memory
//  if it remembers high for all inputs, send low.
//  else, send high.

// broadcast module :
// on receive:
//   sends same pulse.

// Button module
//  sends a low pulse is sent to the broadcast module.
