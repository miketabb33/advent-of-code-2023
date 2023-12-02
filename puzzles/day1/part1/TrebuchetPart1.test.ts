import { describe, expect, it } from 'bun:test'
import { TrebuchetPart1 } from './TrebuchetPart1'

describe('Trebuchet Part 1', () => {
  it('should return 23 when given 2 lines which sum to 11 and 12', () => {
    const firstLine = 'fub1fsajflksdjl1fkjslfk'
    const secondLine = 'fsdfa1fdsafsfasfsfdsaf2'
    const input = `${firstLine}\n${secondLine}`
    expect(TrebuchetPart1(input)).toEqual(23)
  })
  it('should handle 3 lines', () => {
    const firstLine = 'fub1fsajflksdjl1fkjslfk'
    const secondLine = 'fsdfa1fdsafsfasfsfdsaf2'
    const thirdLine = 'fsdfa9fdsafsfdsaf9'
    const input = `${firstLine}\n${secondLine}\n${thirdLine}`
    expect(TrebuchetPart1(input)).toEqual(122)
  })
})
