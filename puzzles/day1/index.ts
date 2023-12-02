import { readFileSync } from 'fs'
import { Trebuchet } from './Trebuchet'

const inputBuffer = readFileSync(`${__dirname}/input.txt`)

Trebuchet(inputBuffer.toString())
