import { describe, expect, it } from 'bun:test'
import { answer1 } from './answer1'

describe('answer 1', () => {
  it('should calculate answer 1, 631+769+148', () => {
    const input =
      '.......*...........*.....*...........*........631%...703.......*..12....652.................*.$............368.769*148.................*....'
    expect(answer1(input)).toEqual(1548)
  })
  it('should calculate answer with multiple lines', () => {
    const input = '..35..633.\n......#...'
    expect(answer1(input)).toEqual(633)
  })
  it('should calculate answer with multiple lines, flipped', () => {
    const input = '......#...\n..35..633.'
    expect(answer1(input)).toEqual(633)
  })
  it('should calculate answer with multiple lines, same line and adjacent line matches', () => {
    const input = '......#...\n..#35..633.'
    expect(answer1(input)).toEqual(668)
  })
  it('should calculate example', () => {
    const input =
      '467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..'
    expect(answer1(input)).toEqual(4361)
  })
  it('should calculate part of input', () => {
    const input =
      '........396...*.476.774.680.189@.438......669............936.......................195.......405.926.213.....254.....*.................*....\n...-.......-.......*.....&...........$........22....732.*.......$121.200...............-.......*........*.............522.825..77...........'
    expect(answer1(input)).toEqual(4712)
  })
  it('should match', () => {
    const input = '.863..\n....*.\n.639..'
    expect(answer1(input)).toEqual(1502)
  })
  it('should match', () => {
    const input = '....816\n795*...'
    expect(answer1(input)).toEqual(1611)
  })
})
