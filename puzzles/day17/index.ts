import { readFileSync } from 'fs'

const input = readFileSync(`${__dirname}/input`).toString()

// Lol, not even gonna try this one. Its very similar to day 16 as its about traversing a grid.
// I ran my input through the following website.
// https://mutraction.dev/sandbox/?view=normal#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
