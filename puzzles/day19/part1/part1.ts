type Category = 'x' | 'm' | 'a' | 's'
type Operation = '<' | '>'

type Workflows = Map<string, (ConditionalRule | DirectRule)[]>

export type ConditionalRule = {
  type: 'conditional'
  category: Category
  value: number
  operation: Operation
  dest: string
}

export type DirectRule = {
  type: 'direct'
  dest: string
}

export const day19Part1 = (input: string): number => {
  const parts = splitParts(input)
  const workflows = parseWorkflows(parts[0])
  let sum = 0

  parts[1].forEach((partString) => {
    const part = new WorkflowPart(partString)
    const isAccepted = part.isAccepted(workflows)
    if (isAccepted) sum += part.sum()
  })

  return sum
}

export const splitParts = (input: string) => {
  const parts = input.split('\n\n')
  return [
    parts[0].split('\n').filter((x) => !!x),
    parts[1].split('\n').filter((x) => !!x),
  ]
}

export const parseWorkflows = (lines: string[]): Workflows => {
  const workflows = new Map<string, (ConditionalRule | DirectRule)[]>()

  lines.forEach((line) => {
    const nameAndRules = line.replace('}', '').split('{')
    const rules = parseRules(nameAndRules[1])
    workflows.set(nameAndRules[0], rules)
  })

  return workflows
}

const parseRules = (rulesLine: string): (ConditionalRule | DirectRule)[] => {
  const rulesString = rulesLine.split(',')

  return rulesString.map((ruleString) => {
    const colonIndex = ruleString.indexOf(':')
    if (colonIndex != -1) {
      const conditionalRule: ConditionalRule = {
        type: 'conditional',
        category: ruleString[0] as Category,
        value: +ruleString.substring(2, colonIndex),
        operation: ruleString[1] as Operation,
        dest: ruleString.substring(colonIndex + 1, ruleString.length),
      }
      return conditionalRule
    } else {
      return { type: 'direct', dest: ruleString }
    }
  })
}

export class WorkflowPart {
  private values = new Map<Category, number>()
  private currentWorkflow = 'in'

  constructor(partString: string) {
    const valueString = partString.replace('}', '').replace('{', '').split(',')
    this.values.set('x', this.getValue(valueString[0]))
    this.values.set('m', this.getValue(valueString[1]))
    this.values.set('a', this.getValue(valueString[2]))
    this.values.set('s', this.getValue(valueString[3]))
  }

  private getValue = (section: string): number => {
    return +section.substring(2, section.length)
  }

  isAccepted = (workflow: Workflows): boolean => {
    while (this.currentWorkflow !== 'A' && this.currentWorkflow !== 'R') {
      const rules = workflow.get(this.currentWorkflow)!

      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i]
        if (this.isValidDest(rule)) {
          this.currentWorkflow = rule.dest
          break
        }
      }
    }

    return this.currentWorkflow === 'A'
  }
  private isValidDest = (rule: ConditionalRule | DirectRule) => {
    if (rule.type === 'conditional') {
      const comp = this.values.get(rule.category)!
      if (rule.operation === '<') return comp < rule.value
      if (rule.operation === '>') return comp > rule.value
    } else return true
  }

  sum = () => {
    return (
      this.values.get('x')! +
      this.values.get('m')! +
      this.values.get('a')! +
      this.values.get('s')!
    )
  }
}
