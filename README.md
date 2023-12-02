# Advent Of Code 2023

## Getting Setup

This project uses bun as its package manager.

1. To install bun

```bash
brew tap oven-sh/bun
brew install bun
```

2. To install dependencies:

```bash
bun install
```

## Running the project

The project is broken up into day directories. Each day directory has instructions, puzzle code, and test code.

#### Start Next Day Puzzle:

There is a scaffold script to build out the required files for each days puzzle.

Run when starting a new days puzzle:

```bash
bun startDay {day}
```

For example:

```bash
bun startDay 1
```

#### Run Puzzle Code:

```bash
bun runDay {day}
```

For example:

```bash
bun runDay 1
```

#### Run Tests:

```bash
bun test
```

Or run test code on save:

```bash
bun test --watch
```

## AoC Command Line Interface

Use the CLI to read puzzle descriptions, download puzzle input, submit answers and check if they are correct.

[More Info](https://github.com/scarvalhojr/aoc-cli)

---

This project was created using `bun init` in bun v1.0.6. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
