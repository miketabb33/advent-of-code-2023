import {
  createDayDirectoryUnlessExists,
  createFilesForDay,
  getInstructions,
} from './puzzleCRUD'

const main = () => {
  const day = process.argv[2]
  if (!day) throw new Error('Missing day argument in command')

  const instructionBuffer = getInstructions()
  if (!instructionBuffer || instructionBuffer.length === 0) {
    console.log(
      `Instructions for day ${day} could not be found. Please try again later.`
    )
    return
  }

  const path = createDayDirectoryUnlessExists(day)
  if (!path) {
    console.log(`Day ${day} has already been started.`)
    return
  }

  createFilesForDay(path, instructionBuffer)
  console.log('Files Created')
}

main()
