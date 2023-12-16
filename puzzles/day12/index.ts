import { readFileSync } from 'fs'

import { day12 } from './day12'

const input = readFileSync(`${__dirname}/input`).toString()

console.log('answer1: ', day12(input))
