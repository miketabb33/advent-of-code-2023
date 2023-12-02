import { describe, expect, it } from 'bun:test'
import { TrebuchetPart2 } from './TrebuchetPart2'

describe('Trebuchet Part 2', () => {
  it('should return 23 when given 2 lines which sum to 11 and 12', () => {
    const firstLine = 'fubonefsajflksdjl1fkjslfk'
    const secondLine = 'fsdfa1fdsafsfasfsfdsaf2'
    const input = `${firstLine}\n${secondLine}`
    expect(TrebuchetPart2(input)).toEqual(23)
  })
  it('should handle 3 lines', () => {
    const firstLine = 'fub1fsajflksdjl1fkjslfk'
    const secondLine = 'fsdfa1fdsafsfasfsfdsaf2'
    const thirdLine = 'fsdfaninefdsafsfdsaf9'
    const input = `${firstLine}\n${secondLine}\n${thirdLine}`
    expect(TrebuchetPart2(input)).toEqual(122)
  })
})
