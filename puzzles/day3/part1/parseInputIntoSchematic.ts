import { SchematicLine, SchematicResult } from '../types'

export const starter = (input: string) =>
  `Ready, solve that puzzle! Input: ${input}`

export const parseInputIntoSchematic = (input: string): SchematicLine[] => {
  return input
    .split('\n')
    .filter((line) => line !== '')
    .map((line, index) => {
      const symbols = parseSymbols(line)
      const partNumbers = parseNumbers(line)
      const schematicLine: SchematicLine = {
        lineNumber: index + 1,
        symbols,
        partNumbers,
      }
      return schematicLine
    })
}

export const parseSymbols = (line: string) => {
  const symbols: SchematicResult[] = []
  line.split('').forEach((char, index) => {
    if (isSymbol(char)) symbols.push({ index, value: char })
  })
  return symbols
}

export const parseNumbers = (line: string) => {
  const numbers: SchematicResult[] = []

  let cache: SchematicResult | null = null

  line.split('').forEach((char, index) => {
    if (isNumber(char)) {
      if (!cache) cache = { index, value: char }
      else cache.value += char
    } else {
      if (cache) {
        numbers.push(cache)
        cache = null
      }
    }
  })
  return numbers
}

export const isSymbol = (char: string): boolean => {
  const symbols = ['@', '*', '#', '$', '%', '&', '*', '-', '=', '+', '/']
  return symbols.includes(char)
}

export const isNumber = (char: string): boolean => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  return numbers.includes(char)
}
