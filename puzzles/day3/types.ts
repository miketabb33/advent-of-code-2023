export type SchematicLine = {
  lineNumber: number
  symbols: SchematicResult[]
  partNumbers: SchematicResult[]
}

export type SchematicResult = {
  index: number
  value: string
}
