import { describe, expect, it } from 'bun:test'
import { readFileSync } from 'fs'
import {
  ConditionalRule,
  WorkflowPart,
  day19Part1,
  parseWorkflows,
  splitParts,
} from './part1'

const input = readFileSync(`${__dirname}/../exampleInput`).toString()
const parts = splitParts(input)
const workflows = parseWorkflows(parts[0])

describe('Day 19 part 1', () => {
  it('should run example', () => {
    expect(day19Part1(input)).toEqual(19114)
  })
})

describe('should parse', () => {
  it('split parts', () => {
    expect(parts.length).toEqual(2)
    expect(parts[0].length).toEqual(11)
    expect(parts[1].length).toEqual(5)
  })

  it('should parse workflows', () => {
    const result1 = workflows.get('px')!
    expect(result1.length).toEqual(3)

    expect(result1[0].type).toEqual('conditional')
    expect((result1[0] as ConditionalRule).category).toEqual('a')
    expect((result1[0] as ConditionalRule).operation).toEqual('<')
    expect((result1[0] as ConditionalRule).value).toEqual(2006)
    expect((result1[0] as ConditionalRule).dest).toEqual('qkq')

    expect(result1[1].type).toEqual('conditional')
    expect((result1[1] as ConditionalRule).category).toEqual('m')
    expect((result1[1] as ConditionalRule).operation).toEqual('>')
    expect((result1[1] as ConditionalRule).value).toEqual(2090)
    expect((result1[1] as ConditionalRule).dest).toEqual('A')

    expect(result1[2].type).toEqual('direct')
    expect(result1[2].dest).toEqual('rfg')

    const result2 = workflows.get('in')!
    expect(result2.length).toEqual(2)

    expect(result2[0].type).toEqual('conditional')
    expect((result2[0] as ConditionalRule).category).toEqual('s')
    expect((result2[0] as ConditionalRule).operation).toEqual('<')
    expect((result2[0] as ConditionalRule).value).toEqual(1351)
    expect((result2[0] as ConditionalRule).dest).toEqual('px')

    expect(result2[1].type).toEqual('direct')
    expect(result2[1].dest).toEqual('qqz')
  })
})

describe('Workflow Part', () => {
  it('should get sum for 1', () => {
    const subject = new WorkflowPart(parts[1][0])
    expect(subject.sum()).toEqual(7540)
  })
  it('should get sum for 2', () => {
    const subject = new WorkflowPart(parts[1][1])
    expect(subject.sum()).toEqual(4286)
  })

  //{x=787,m=2655,a=1222,s=2876}
  it('is Accepted - 1', () => {
    const subject = new WorkflowPart(parts[1][0])
    expect(subject.isAccepted(workflows)).toBe(true)
  })
  it('is Accepted - 2', () => {
    const subject = new WorkflowPart(parts[1][1])
    expect(subject.isAccepted(workflows)).toBe(false)
  })
  it('is Accepted - 3', () => {
    const subject = new WorkflowPart(parts[1][2])
    expect(subject.isAccepted(workflows)).toBe(true)
  })
  it('is Accepted - 4', () => {
    const subject = new WorkflowPart(parts[1][3])
    expect(subject.isAccepted(workflows)).toBe(false)
  })
  it('is Accepted - 5', () => {
    const subject = new WorkflowPart(parts[1][4])
    expect(subject.isAccepted(workflows)).toBe(true)
  })
})
