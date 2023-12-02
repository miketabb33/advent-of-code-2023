import { writeFileSync } from 'fs'
import {
  createDayDirectoryUnlessExists,
  getTempFile,
  makePart1TestFile,
  isBufferSafe,
  makePart1ProdFile,
  makeIndex,
} from './puzzleCRUD'

const main = () => {
  const day = process.argv[2]
  if (!day) {
    console.log('Missing day argument in command')
    return
  }

  const instructionBuffer = getTempFile('puzzle.md')
  if (!isBufferSafe(instructionBuffer)) {
    console.log(
      `Instructions for day ${day} could not be found. Please try again later.`
    )
    return
  }

  const inputBuffer = getTempFile('input')
  if (!isBufferSafe(inputBuffer)) {
    console.log(
      `Input for day ${day} could not be found. Please try again later.`
    )
    return
  }

  const path = createDayDirectoryUnlessExists(day)
  if (!path) {
    console.log(`Day ${day} has already been started.`)
    return
  }

  makeIndex(path)
  makePart1TestFile(path)
  makePart1ProdFile(path)
  writeFileSync(`${path}/puzzle.md`, instructionBuffer)
  writeFileSync(`${path}/input`, inputBuffer)

  console.log('Files Created')
}

main()
