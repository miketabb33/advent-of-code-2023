export type ConditionalRule = {
  type: 'conditional'
  value: string
  operation: '<' | '>'
  dest: string
}

export type DirectRule = {
  type: 'direct'
  dest: string
}

export const starter = (input: string) => {
  const lines = input.split('\n').filter((x) => !!x)
  return `Ready, solve that puzzle! Input: ${lines}`
}

export const splitParts = (input: string) => {
  const parts = input.split('\n\n')
  return [
    parts[0].split('\n').filter((x) => !!x),
    parts[1].split('\n').filter((x) => !!x),
  ]
}

export const parseWorkflows = (
  lines: string[]
): Map<string, (ConditionalRule | DirectRule)[]> => {
  const workflows = new Map<string, (ConditionalRule | DirectRule)[]>()

  lines.forEach((line) => {
    workflows.set('px', [parseRule(), parseRule(), parseRule()])
  })

  return workflows
}

const parseRule = (): DirectRule => {
  return { type: 'direct', dest: '' }
}
