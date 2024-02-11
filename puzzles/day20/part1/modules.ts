export type Pulse = 'high' | 'low'

export type InputMemory = {
  pulse: Pulse
  input: string
}

export type Connection = {
  pulse: Pulse
  input: string
  destination: string
}

export type ModuleType = 'broadcaster' | 'flipflop' | 'conjunction'

export interface Module {
  readonly type: ModuleType
  readonly id: string
  readonly destinations: string[]
  process: (pulse: Pulse, input?: string) => Connection[]
}

export class BroadcasterModule implements Module {
  readonly type: ModuleType = 'broadcaster'
  readonly id: string = 'broadcaster'
  readonly destinations: string[]

  constructor(destinations: string[]) {
    this.destinations = destinations
  }

  process = (pulse: Pulse): Connection[] => {
    return this.destinations.map((destination) => {
      const connection: Connection = {
        pulse,
        input: this.id,
        destination,
      }
      return connection
    })
  }
}

export class FlipFlopModule implements Module {
  readonly type: ModuleType = 'flipflop'
  readonly id: string
  readonly destinations: string[]
  private isOn = false

  constructor(id: string, destinations: string[]) {
    this.destinations = destinations
    this.id = id
  }

  process = (pulse: Pulse): Connection[] => {
    if (pulse === 'high') return []
    this.isOn = !this.isOn
    const newPulse: Pulse = this.isOn ? 'high' : 'low'
    return this.destinations.map((destination) => {
      const connection: Connection = {
        pulse: newPulse,
        input: this.id,
        destination,
      }
      return connection
    })
  }
}

export class ConjunctionModule implements Module {
  readonly type: ModuleType = 'conjunction'
  readonly id: string
  readonly destinations: string[]
  private inputMemory: InputMemory[] = []

  constructor(id: string, destinations: string[]) {
    this.destinations = destinations
    this.id = id
  }

  process = (pulse: Pulse, input?: string): Connection[] => {
    if (!input) throw new Error('Missing input for Conjunction Module')
    this.updateInputMemory(pulse, input)
    const allRememberedInputsAreHigh = this.inputMemory.every(
      (i) => i.pulse === 'high'
    )

    return this.destinations.map((destination) => {
      const connection: Connection = {
        pulse: allRememberedInputsAreHigh ? 'low' : 'high',
        input: this.id,
        destination,
      }
      return connection
    })
  }

  private updateInputMemory = (pulse: Pulse, input: string) => {
    const rememberedInput = this.inputMemory.find((x) => x.input === input)
    if (!rememberedInput) {
      this.inputMemory.push({ input, pulse })
    } else {
      rememberedInput.pulse = pulse
    }
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
