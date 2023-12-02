import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'

export const DAY_DIR_NAME = (day: string) => `puzzles/day${day}`

export const getInstructions = () => {
  const TEMP_FILENAME = 'temp.txt'
  const instructions = readFileSync(TEMP_FILENAME)
  if (!instructions) throw new Error('Instructions not found')
  rmSync(TEMP_FILENAME)
  return instructions
}

export const createDayDirectoryUnlessExists = (day: string) => {
  const dayDir = DAY_DIR_NAME(day)
  if (existsSync(dayDir)) return null
  mkdirSync(dayDir)
  return dayDir
}

export const createFilesForDay = (path: string, instructions: Buffer) => {
  writeFileSync(`${path}/index.ts`, '')
  writeFileSync(`${path}/instructions.txt`, instructions)
  makeTestFile(path)
}

const makeTestFile = (path: string) => {
  writeFileSync(
    `${path}/index.test.ts`,
    "import { describe, expect, it } from 'bun:test'\n\ndescribe('', () => {\n  it('', () => {\n    expect(true).toEqual(false)\n  })\n})\n"
  )
}
