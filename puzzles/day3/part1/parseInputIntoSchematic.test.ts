import { describe, expect, it } from 'bun:test'
import {
  isNumber,
  isSymbol,
  parseInputIntoSchematic,
  parseNumbers,
  parseSymbols,
} from './parseInputIntoSchematic'

describe('Parse Input Into Schematic', () => {
  it('should return empty arr when given empty', () => {
    const input = ''
    expect(parseInputIntoSchematic(input)).toEqual([])
  })
  it('should return a symbol and number from a single line', () => {
    const input = '.....+.58.'
    const results = parseInputIntoSchematic(input)
    expect(results.length).toEqual(1)

    expect(results[0].symbols.length).toEqual(1)
    expect(results[0].symbols[0]).toEqual({ index: 5, value: '+' })

    expect(results[0].partNumbers.length).toEqual(1)
    expect(results[0].partNumbers[0]).toEqual({ index: 7, value: '58' })
  })
  it('should return symbols and numbers from a many line', () => {
    const input =
      '.....+.58.\n311...672...34...391.....591......828.......................738....................223....803..472..................................714.840.'
    const results = parseInputIntoSchematic(input)
    expect(results.length).toEqual(2)

    expect(results[0].symbols.length).toEqual(1)
    expect(results[0].symbols[0]).toEqual({ index: 5, value: '+' })

    expect(results[0].partNumbers.length).toEqual(1)
    expect(results[0].partNumbers[0]).toEqual({ index: 7, value: '58' })

    expect(results[1].symbols.length).toEqual(0)
    expect(results[1].partNumbers.length).toEqual(12)
  })
})

describe('Parse Symbol', () => {
  it('should return empty results when given empty line', () => {
    const line = ''
    expect(parseSymbols(line)).toEqual([])
  })
  it('should build a single symbol item when only 1 exists', () => {
    const line = '...*......'
    expect(parseSymbols(line).length).toEqual(1)
    expect(parseSymbols(line)[0]).toEqual({ index: 3, value: '*' })
  })
  it('should build many symbol items when more then 1 exists', () => {
    const line = '...$.*....'
    expect(parseSymbols(line).length).toEqual(2)
    expect(parseSymbols(line)[0]).toEqual({ index: 3, value: '$' })
    expect(parseSymbols(line)[1]).toEqual({ index: 5, value: '*' })
  })
  it('should build many symbol items when more then 1 exists, with other chars', () => {
    const line = '.432..$.*.ja.423. ......'
    expect(parseSymbols(line).length).toEqual(2)
    expect(parseSymbols(line)[0]).toEqual({ index: 6, value: '$' })
    expect(parseSymbols(line)[1]).toEqual({ index: 8, value: '*' })
  })
})

describe('Parse Number', () => {
  it('should return empty results when given empty line', () => {
    const line = ''
    expect(parseNumbers(line)).toEqual([])
  })
  it('should return number result when given a number in line', () => {
    const line = '..592.....'
    expect(parseNumbers(line).length).toEqual(1)
    expect(parseNumbers(line)[0]).toEqual({ index: 2, value: '592' })
  })
  it('should build many number items when more then 1 exists', () => {
    const line = '.664.598..'
    expect(parseNumbers(line).length).toEqual(2)
    expect(parseNumbers(line)[0]).toEqual({ index: 1, value: '664' })
    expect(parseNumbers(line)[1]).toEqual({ index: 5, value: '598' })
  })
  it('should build many number items when more then 1 exists, with other chars', () => {
    const line = '.664.$598.*.ecsa'
    expect(parseNumbers(line).length).toEqual(2)
    expect(parseNumbers(line)[0]).toEqual({ index: 1, value: '664' })
    expect(parseNumbers(line)[1]).toEqual({ index: 6, value: '598' })
  })
  it('should build number at when at end', () => {
    const line = '....816'
    expect(parseNumbers(line).length).toEqual(1)
    expect(parseNumbers(line)[0]).toEqual({ index: 4, value: '816' })
  })
})

describe('Is Symbol', () => {
  it.each(['@', '*', '#', '$', '%', '&', '*', '-', '=', '+', '/'])(
    'should return true',
    (symbol) => expect(isSymbol(symbol)).toEqual(true)
  )
  it('should return false when given a "."', () => {
    expect(isSymbol('.')).toEqual(false)
  })
  it('should return false when given a number', () => {
    expect(isSymbol('5')).toEqual(false)
  })
})

describe('Is number', () => {
  it.each(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])(
    'should return true',
    (numberChar) => expect(isNumber(numberChar)).toEqual(true)
  )
  it('should return false when given a "."', () => {
    expect(isNumber('.')).toEqual(false)
  })
  it('should return false when given a number', () => {
    expect(isNumber('5')).toEqual(true)
  })
})
