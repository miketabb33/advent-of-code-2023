import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'

export const DAY_DIR_NAME = (day: string) => `puzzles/day${day}`

type FileName = 'puzzle.md' | 'input'

export const getTempFile = (name: FileName) => {
  try {
    const tempFile = readFileSync(name)
    rmSync(name)
    return tempFile
  } catch {
    return new Buffer('')
  }
}

export const createDayDirectoryUnlessExists = (day: string) => {
  const dayDir = DAY_DIR_NAME(day)
  if (existsSync(dayDir)) return null
  mkdirSync(dayDir)
  mkdirSync(`${dayDir}/part1`)
  return dayDir
}

export const makeIndex = (path: string) =>
  writeFileSync(
    `${path}/index.ts`,
    "import { readFileSync } from 'fs'\nimport { starter } from './part1/part1'\n\nconst lines = readFileSync(`${__dirname}/input`).toString().split('\\n').filter(x => !!x)\n\nconst answer1 = starter(lines)\n\nconsole.log('answer1: ', answer1)\n"
  )

export const makePart1TestFile = (path: string) => {
  writeFileSync(
    `${path}/part1/part1.test.ts`,
    "import { describe, expect, it } from 'bun:test'\n\ndescribe('', () => {\n  it('', () => {\n    expect(true).toEqual(false)\n  })\n})\n"
  )
}

export const makePart1ProdFile = (path: string) => {
  writeFileSync(
    `${path}/part1/part1.ts`,
    'export const starter = (lines: string[]) =>\n  `Ready, solve that puzzle! Input: ${input}`\n'
  )
}

export const isBufferSafe = (buffer?: Buffer) => !!buffer && buffer.length > 0
