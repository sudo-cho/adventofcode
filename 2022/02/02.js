import fs from "fs"

const input = fs
  .readFileSync('input')
  .toString()
  .split(/\n/)
  .slice(0, -1)

const enumType = { X: 1, Y: 2, Z: 3 }

const enumScore = [
  { type: 'AX', score: 3, score2: 3 },
  { type: 'AY', score: 6, score2: 4 },
  { type: 'AZ', score: 0, score2: 8 },
  { type: 'BX', score: 0, score2: 1 },
  { type: 'BY', score: 3, score2: 5 },
  { type: 'BZ', score: 6, score2: 9 },
  { type: 'CX', score: 6, score2: 2 },
  { type: 'CY', score: 0, score2: 6 },
  { type: 'CZ', score: 3, score2: 7 }
]

const p1 = input.map(d => d.split(' ')).map(
  e => enumScore.find(
    f => f.type === `${e[0]}${e[1]}`
  )?.score + enumType[e[1]]
).reduce((a, b) => a + b, 0)

const p2 = input.map(
  e => enumScore.find(f => f.type === e.replace(/\s/, ''))?.score2
).reduce((a, b) => a + b, 0)

console.log(p1, p2)
